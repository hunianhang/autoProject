var url = "https://www.amazon.com/gp/product/B07WCQWZBD/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1";
var price = "23.99";
var cnt = 0;
var website = "www.amazon.com";
var amazon_account = "hhnh4066@gmail.com";
var pwd = "Ant007007.";
var amazon_app = "com.amazon.mShop.android.shopping";

var step = 0;

var g_cfg = {
    pkg_chrome: "com.android.chrome",
    device_w_x: device.getScreenWidth(),
    device_h_y: device.getScreenHeight(),
}

function main() {
    laoleng.EC.init();

    home();  //step = 1;
    reset_environment();
    sleep(1000);
    open_webpage(website);  //step = 2
    login_webpage();  //step = 3
    reset_web_page();
    input_product_url(url); //step = 4
    add_product();  //step = 5
    open_amazon_app();
    check_in_product();
}

main();