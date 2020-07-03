<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="/css/app.css">
    <style>
        .search-item {
            background: #F8F4F4;
            margin-bottom: 20px
        }
        .prod-mobile-wrap {
            min-height: 100px;
            max-width: 400px;
            margin: 0 auto
        }

        .prod-mobile-image {
            width: 93px;
            float: left;
            margin-right: 20px
        }

        .prod-mobile-text {
            overflow: hidden
        }

        .prod-mobile-title {
            text-transform: uppercase;
            margin-bottom: 20px;
            overflow: hidden
        }
        .share-icon {
            background-position: -67px -169px;
            width: 24px;
            height: 25px
        }

        .search-item-image {
            float: left;
            width: 30%;
            max-width: 229px
        }

        .search-item-content {
            overflow: hidden;
            padding: 12px 20px
        }

        .search-item-content .prod-mobile-title {
            padding-top: 4px;
            margin-bottom: 14px;
            font-weight: 700
        }

        .search-item-content .prod-mobile-title:hover a {
            text-decoration: underline
        }
        .cm4 {
            width: 33.33333333%;
            position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
            float: left
        }
        .search-item-content .table > tbody > tr > td:first-child {
            border-left: none;
            padding-left: 0;
            width: 95px
        }

        .search-item-content .table > tbody > tr > td, .search-item-content .table > tbody > tr > th {
            border-color: #cccccc;
            border-right: none
        }

        .prod-title, .prod-price {
            color: #f50
        }

        .search-item-content .table strong {
            text-transform: uppercase
        }

        .prod-actions {
            text-align: left;
            margin-left: -20px
        }

        .prod-actions .btn {
            margin-left: 20px
        }

        .mobile-buttons {
            display: none
        }

        .prod-btn + .prod-btn {
            margin-left: 20px
        }

        .search-item-buttons .btn.btn-solid.btn2 {
            background-color: #59A809;
            border-color: #59A809;
            color: #fff
        }

        .search-item-buttons .btn.btn-solid.btn2:hover {
            background-color: rgba(89, 168, 9, 0.4);
            color: #59A809
        }

        .search-item-buttons .btn.btn-solid {
            background: #f50;
            border-color: #f50;
            color: #fff
        }

        .search-item-buttons .btn.btn-solid:hover {
            background-color: rgba(255, 85, 0, 0.4);
            color: #f50
        }

        .search-item-buttons {
            clear: both
        }

        .search-item-buttons .btn {
            border: 2px solid #59A809;
            text-align: center;
            padding: 11px 18px 9px;
            color: #59A809;
            text-transform: uppercase;
            font-size: 14px;
            display: inline-block;
            line-height: 16px;
            cursor: pointer;
            max-width: 250px
        }

        .search-item-buttons .btn:hover {
            background-color: rgba(89, 168, 9, 0.4)
        }
        .manheim-search-result.road-bg {
            background-position: center 130%
        }

        .manheim-search-result .search-item {
            border: 1px solid #ccc
        }

        .manheim-search-result tr td {
            padding: 10px 8px
        }

        .manheim-search-result tr td:first-child {
            font-weight: 700
        }

        .manheim-search-result .jq-selectbox__select-text {
            min-width: 200px
        }

        .manheim-search-result .jq-selectbox + label {
            margin-left: 10px;
            font-weight: 700
        }

        .manheim-search-result nav {
            margin-bottom: 20px
        }

        .manheim-search-result nav .row {
            margin: 0;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            width: 100%;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center
        }

        .manheim-search-result nav:last-child .row {
            -webkit-box-pack: end;
            -ms-flex-pack: end;
            justify-content: flex-end
        }

    </style>
</head>
<body>
<div class="container border" id="app">
    <example-component></example-component>
</div>
<script src="/js/app.js"></script>

</body>
</html>
