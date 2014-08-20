<?php
    function register_my_menus() {
        register_nav_menus(
            array(
                //'top-bar' => __('Top Bar')
            )
        );
    }

    add_action('init', 'register_my_menus');
?>
