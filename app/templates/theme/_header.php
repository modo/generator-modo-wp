<!doctype html>
<!--[if lt IE 7]><html class="no-js ie6 ie oldie" lang="en"><![endif]-->
<!--[if IE 7]><html class="no-js ie7 ie oldie" lang="en"><![endif]-->
<!--[if IE 8]><html class="no-js ie8 ie oldie" lang="en"><![endif]-->
<!--[if IE 9]><html class="no-js ie9 ie" lang="en"><![endif]-->
<!--[if gt IE 9]><html class="no-js" lang="en"><![endif]-->
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=100%, initial-scale=1" />

    <title><?php wp_title( '|| ', true, 'right' ); ?><?php bloginfo('name'); ?></title>
    <meta name="keywords" content="" />
    <meta name="description" content="Modo is a creative firm designing dynamic, people focused web experiences. We construct web sites and applications for mission driven and innovative organizations." />

    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/lib/min/styles.css" />

    <script src="<?php echo get_template_directory_uri(); ?>/lib/min/preload.min.js"></script>
    <script>
        window.site_url = '<?php echo site_url(); ?>';
        window.theme_dir = '<?php echo get_template_directory_uri(); ?>';
    </script>

    <!-- Icons -->
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/lib/img/favicons/favicon.ico" />

    <?php
        $page = str_replace(' ', '-', strtolower(get_the_title()));
    ?>
</head>
<body data-page="<?php echo $page; ?>">
