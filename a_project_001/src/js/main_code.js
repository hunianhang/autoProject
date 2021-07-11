function open_webpage(website) {
    let temp_node;
    sleep(1000);
    utils.openApp(g_cfg.pkg_chrome);
    sleep(1000);
    while (true) {
        logi("===>>>>>> open amazon webpage");
        if (findNode(id("com.android.chrome:id/url_bar"))) {
            temp_node = g_ret;
            if (findNode(text("amazon.com").id("com.android.chrome:id/url_bar"))) {
                logd("enter amazon page");
                break;
            } else {
                temp_node.click();
                temp_node.clearText();
                temp_node.inputText(website);
                if (agentEvent.enter()) {
                    logd("enter www.amazon.com");
                } else {
                    loge("input, enter,fail");
                }
            }
        }
    }
}

function login_webpage() {
    let temp_node;
    logi("===>>>>home_webpage");
    while (true) {
        // keepNode();
        if (findNode(id("nav-logobar-greeting").desc("Sign In"))) {
            g_ret.click();
        } else if (findNode(text("Amazon Sign-In"))) {
            if (findNode(id("ap_email_login"), true)) {
                g_ret.inputText(amazon_account);
                if (findNode(text("Continue").id("Continue"))) {
                    findClickEx(g_ret);
                }
            } else if (findNode(id("ap_password"), true)) {
                g_ret.inputText(pwd);
                swipeScreenDown(g_cfg.device_h_y / 10 * 3, g_cfg.device_h_y / 10 * 1,);
                if (findNode(text("Sign-In").id("signInSubmit"))) {
                    findClickEx(g_ret);
                }
            }
        } else if (findNode(id("nav-greeting-name").descMatch("Hello,.*"))) {
            g_ret.click();
        } else if (findNode(text("Account settings"))) {
            logd("login success!");
            break;
        }
        logd("login webpage step");
    }
}

function input_product_url(url) {
    let temp_node;
    let temp_url = url.slice(12);
    logd(temp_url);
    logi("===>>>>>> input product url");
    // loge("input, enter,fail");
    while (true) {
        if (findNode(id("com.android.chrome:id/url_bar"))) {
            temp_node = g_ret;
            if (findNode(text(temp_url).id("com.android.chrome:id/url_bar"))) {
                logd("enter amazon page success");
                break;
            } else {
                temp_node.click();
                temp_node.clearText();
                temp_node.inputText(url);
                if (agentEvent.enter()) {
                    logd("input, enter,success");
                    sleep(1000);
                    break;
                } else {
                    loge("input, enter,fail");
                }
            }
        }
    }
}

function add_product() {
    logi("===>>>>>>add_product");
    let temp_node;
    let price_string;
    let real_cost = 0.0;
    let buy_price = 0.0
    while (true) {
        swipeScreenDown(g_cfg.device_h_y / 10 * 3, g_cfg.device_h_y / 10 * 1);
        if (findNode(id("newPitchPriceWrapper_feature_div").clz("android.view.View"))) {
            g_ret = g_ret.child(0).allChildren();
            price_string = g_ret[1].text.trim() + '.' + g_ret[2].text.trim();
            real_cost = parseFloat(price_string).toFixed(2); //产品价格
            buy_price = parseFloat(price).toFixed(2);//购买价格

            logd(real_cost, buy_price);
            // if (buy_price > real_cost) {
            if (real_cost > buy_price) {
                logd("too expensive ", real_cost);
                exit();
            } else if (buy_price === real_cost || buy_price > real_cost) {
                logd("We could buy it");
            }
        } else if (findNode(text("Add to Cart").id("add-to-cart-button"))) {
            g_ret.click();
            step = 6;
            break;
        }
    }
}

function open_amazon_app() {
    // if (step === 6) {
    logi("===>>>>>>open_amazon_app");
    home();
    while (true) {
        utils.openApp("com.amazon.mShop.android.shopping");
        if (findNode(text("Whole Foods").id("com.amazon.mShop.android.shopping:id/subnav_button_text"))) {
            logd("open amazon app success");
            break;
        }
    }
}

function check_in_product() {
    let temp_node;
    let temp_step = 0;
    step = 7;
    logi("===>>>>>>check_in_product");
    if (step === 7) {
        while (true) {
            switch (temp_step) {
                case 0:
                    logd("click cart");
                    if (findNode(id("com.amazon.mShop.android.shopping:id/cart_count"))) {
                        g_ret = g_ret.parent().parent();
                        g_ret.click();
                        temp_step = 1;
                    } else {
                        temp_step = 0;
                    }
                    break;
                case 1:
                    logd("add product to cart");
                    if (findNode(clz("android.widget.TextView").text("+"))) {
                        sleep(1000);
                        while (cnt) {
                            g_ret.click();
                            sleep(1000);
                            cnt--;
                            logd("add products success----------------------");
                        }
                        temp_step = 2;
                    } else {
                        temp_step = 0;
                    }
                    break;
                case 2:
                    logd("produce the products");
                    if (findNode(textMatch("^Proceed to checkout.*").clz("android.widget.Button"))) {
                        sleep(1000);
                        g_ret.click();
                        logd("check in cart");
                        sleep(1000);
                        temp_step = 3;
                    } else {
                        temp_step = 1;
                    }
                    break;
                case 3:
                    sleep(2000);
                    if (findNode(id("checkoutCurrencyMarketplace").clz("android.view.View"))) {
                        logd("pay for the money");
                        g_ret.click();
                        swipeScreenDown(g_cfg.device_h_y / 10 * 8, g_cfg.device_h_y / 10 * 2,);
                        swipeScreenDown(g_cfg.device_h_y / 10 * 8, g_cfg.device_h_y / 10 * 2,);
                        if (findNode(text("Place your order in USD").clz("android.widget.Button"))) {
                            logd("click place the order");
                            g_ret.click();
                            temp_step = 4;
                            break;
                        } else {
                            back();
                            temp_step = 2;
                        }
                    }
                    break;
                case 4:
                    if (findNode(text("Order placed, thanks!").clz("android.view.View"))) {
                        toast("order success");
                        sleep(100000);
                        temp_step = 5;
                    } else {
                        temp_step = 3;
                    }
                    break;
                default:
                    break;
            }
            if (temp_step === 5) {
                break;
            }
        }
    }
}

function check_in_product_back() {
    let temp_node;
    logi("===>>>>>>check_in_product");
    // let node = id("com.amazon.mShop.android.shopping:id/subnav_button_text").text("Cart");
    if (step === 7) {
        while (true) {
            // if (findNode(id("com.amazon.mShop.android.shopping:id/cart_count")) || findNode(node)) {
            if (findNode(id("com.amazon.mShop.android.shopping:id/cart_count"))) {
                g_ret = g_ret.parent().parent();
                g_ret.click();
                logd("click cart");
                sleep(1000);
                if (findNode(clz("android.widget.TextView").text("+"))) {
                    while (cnt) {
                        g_ret.click();
                        sleep(1000);
                        cnt--;
                    }
                    if (findNode(textMatch("^Proceed to checkout(.*)").clz("android.widget.Button").id("a-autoid-0-announce"))) {
                        g_ret.click();
                        logd("check in cart");
                        sleep(1000);
                        if (findNode(id("checkoutCurrencyMarketplace"))) {
                            g_ret.click();
                            break;
                            swipeScreenDown(g_cfg.device_h_y / 10 * 8, g_cfg.device_h_y / 10 * 2,);
                            swipeScreenDown(g_cfg.device_h_y / 10 * 8, g_cfg.device_h_y / 10 * 2,);
                            if (findNode(text("Place your order in USD").clz("android.widget.Button"))) {
                                g_ret.click();
                            }
                        }
                    }
                }
            } else if (findNode(id("com.amazon.mShop.android.shopping:id/chrome_action_bar_back_icon").desc("Back"))) {
                g_ret.click();
            }
        }
    }
}


function swipeScreenDown(start_y, end_y) {
    let result = swipeToPoint(g_cfg.device_w_x / 2, start_y, g_cfg.device_w_x / 2, end_y, 500);

}

function swipeScreenUp() {
    let result = swipeToPoint(g_cfg.device_w_x / 2, g_cfg.device_h_y / 10 * 2, g_cfg.device_w_x / 2, g_cfg.device_h_y / 10 * 8, 500);
}

function reset_web_page() {
    logi("===>>>>>>reset_web_page");
    let temp_node;
    swipeScreenUp();
    sleep(2000);
    while (true) {
        if (findNode(id("nav-button-cart"))) {
            temp_node = g_ret;
            g_ret = g_ret.child(0).child(0);
            // logd(g_ret.text);
            if (parseInt(g_ret.text)) {
                // logd(g_ret.text);
                click(id("nav-button-cart"));
                sleep(2000);
                if (findNode(text("Save for later").clz("android.widget.Button"))) {
                    g_ret = g_ret.parent().siblings();
                    logd(JSON.stringify(g_ret[1]));
                    g_ret[1].click();
                }
            } else {
                break;
            }
        }
    }
}


function reset_environment() {
    shell.stopApp(amazon_app);
    shell.stopApp(g_cfg.pkg_chrome);
}

function get_total_price() {
    let price_string;
    let cost = 0.0;
    let price_per_one = 0.0
    let real_total_price = 0.0;
    if (findNode(textMatch("^Payment Total:$").clz("android.view.View"))) {
        g_ret = g_ret.siblings();
        price_string = g_ret[0].text.trim().split(" ");
        logd(price_string[1], g_ret[0].text);
    }
    real_total_price = price_string[1];
    return real_total_price
}

function calc_order_price() {
    return cnt * parseFloat(price).toFixed(2);
}
