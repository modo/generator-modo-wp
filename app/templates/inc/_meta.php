<?php
    add_filter( 'cmb_meta_boxes', 'wp_add_meta' );
    add_action( 'init', 'wp_init_meta', 9999 );

    // Define Metaboxes
    function wp_add_meta($meta_boxes) {
        /*
        $meta_boxes['award_link_url'] = array(
            'id' => 'award_link_url',
            'title' => 'Link URL',
            'pages' => array('award'),
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => false,
            'fields' => array(
                array(
                    'name' => '',
                    'desc' => '',
                    'id' => 'link_url',
                    'type' => 'text_url'
                ),
            ),
        );
        */

        return $meta_boxes;
    }

    // Init Metaboxes
    function wp_init_meta() {
        if ( !class_exists( 'cmb_Meta_Box' ) ) {
            require_once( 'plugins/metabox/init.php' );
        }
    }
?>
