<?php

    $themename = "Custom";
    //$shortname = "custom";

    $options = array(
        /*
        array(
            "name" => "Contact Information",
            "type" => "title"
        ),
        */
    );
?>

<?php
    function mytheme_add_admin() {
        global $themename, $shortname, $options, $blog_id;
        //ini_set('display_errors', true);

        //fix slashes
        foreach ($options as $value) {
            if (isset( $_REQUEST[ $value['id'] ] )){
                $_REQUEST[ $value['id'] ] = stripslashes( $_REQUEST[ $value['id'] ] );
            }
        }

        if ( isset($_GET['page']) && $_GET['page'] == basename(__FILE__) ) {
            if (  isset($_REQUEST['action']) && $_REQUEST['action'] == 'save' ) {
                foreach ($options as $value) {
                    if ( isset($value['id']) ){
                        if (isset( $_REQUEST[ $value['id'] ] )){
                            update_option( $value['id'], $_REQUEST[ $value['id'] ]  );
                        } else {
                            delete_option( $value['id'] );
                        }
                    }
                }

                header("Location: {$_SERVER['PATH_INFO']}themes.php?page=theme-options.php&saved=true");
                exit;
            } elseif( isset($_REQUEST['action']) && $_REQUEST['action'] == 'reset') {
                foreach ($options as $value) {
                    delete_option( $value['id'] );
                }

                header("Location: {$_SERVER['PATH_INFO']}themes.php?page=functions.php&reset=true");
                exit;
            }
        }

        // Add to menu for approriate user
        add_theme_page($themename." Options", "".$themename." Options", 'edit_theme_options', basename(__FILE__), 'mytheme_admin');
    }
?>

<?php
    function mytheme_admin() {
        global $themename, $shortname, $options;

        if ( isset($_REQUEST['saved']) ) echo '<div id="message" class="updated fade"><p><strong>'.$themename.' settings saved.</strong></p></div>';
        if ( isset($_REQUEST['reset']) ) echo '<div id="message" class="updated fade"><p><strong>'.$themename.' settings reset.</strong></p></div>';
?>

    <div class="wrap">
        <h2><?php echo $themename; ?> settings</h2>
        <form method="post">

            <?php foreach ($options as $value): ?>
                <?php switch( $value['type'] ): case "title": ?>

                    <p>&nbsp;</p>
                    <h3><?php echo $value['name']; ?></h3>

                <?php break; case "open": ?>

                    <table class="form-table">
                        <tbody>

                <?php break; case "close": ?>

                        </tbody>
                    </table>

                <?php break; case 'text': ?>

                    <tr>
                        <th scope="row">
                            <label for="<?php echo $value['id']; ?>r"><?php echo $value['name']; ?></label>
                        </th>
                        <td>
                            <input name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" value="<?php if ( get_option( $value['id'] ) != "") { echo get_option( $value['id'] ); } else { echo $value['std']; } ?>" class="regular-text" />
                            <p class="description"><?php echo $value['desc']; ?></p>
                        </td>
                    </tr>

                <?php break; case 'textarea': ?>

                    <tr>
                        <th scope="row">
                            <label for="<?php echo $value['id']; ?>r"><?php echo $value['name']; ?></label>
                        </th>
                        <td>
                            <textarea name="<?php echo $value['id']; ?>" cols="60" rows="5" class="regular-text"><?php if ( get_option( $value['id'] ) != "") { echo get_option( $value['id'] ); } else { echo $value['std']; } ?></textarea>
                            <p class="description"><?php echo $value['desc']; ?></p>
                        </td>
                    </tr>

                <?php break; case 'select': ?>

                    <tr>
                        <th scope="row">
                            <label for="<?php echo $value['id']; ?>r"><?php echo $value['name']; ?></label>
                        </th>
                        <td>
                            <select name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>">
                                <?php foreach ($value['options'] as $option) { ?>
                                    <option<?php if ( get_option( $value['id'] ) == $option) { echo ' selected="selected"'; } elseif ($option == $value['std']) { echo ' selected="selected"'; } ?>><?php echo $option; ?></option>
                                <?php } ?>
                            </select>
                            <p class="description"><?php echo $value['desc']; ?></p>
                        </td>
                    </tr>

                <?php break; case "checkbox": ?>

                    <tr>
                        <th scope="row">
                            <label for="<?php echo $value['id']; ?>r"><?php echo $value['name']; ?></label>
                        </th>
                        <td>
                            <? if(get_option($value['id'])){ $checked = "checked=\"checked\""; }else{ $checked = ""; } ?>
                            <input type="checkbox" name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" value="true" <?php echo $checked; ?> />
                            <p class="description"><?php echo $value['desc']; ?></p>
                        </td>
                    </tr>

                <?php break; endswitch; ?>

            <?php endforeach; ?>

            <p>&nbsp;</p>

            <p class="submit">
                <input name="save" type="submit" value="Save changes" class="button button-primary" />
                <input type="hidden" name="action" value="save" />
            </p>
        </form>

    <?php } ?>

<?php add_action('admin_menu', 'mytheme_add_admin'); ?>
