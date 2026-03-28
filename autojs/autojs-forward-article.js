// ============================================
// 微信公众号最新文章多选转发脚本 (Auto.js)
// ============================================
// 使用方法：
// 1. 安装 Auto.js，开启无障碍服务
// 2. 确保微信已登录
// 3. 运行脚本，会自动完成：搜索公众号→打开→最新文章→转发
// ============================================

// 公众号名称（修改这里）
var accountName = "我与AI的那些事";

// 要转发的群名列表
var groups = [
    "龙虾市交流群28",
    "[WorkBuddy]官方交流群101",
    "[WorkBuddy]官方交流群17",
    "龙年吃肉群(暴涨)",
    "宇宙君的养虾厂，找学习搭子",
    "未来科技城青年群",
    "CodeBuddy 自媒体推荐",
    "腾讯云杭州龙虾社"
];

// ============================================
// 以下为脚本逻辑，一般不需要修改
// ============================================

auto.waitFor();

toast("开始执行，请勿操作手机...");
sleep(1000);

// ===== 第一步：打开微信搜索 =====
toastLog("正在打开微信...");
launchApp("微信");
sleep(3000);

// 点击微信顶部搜索按钮
toastLog("正在打开搜索...");
var searchTab = desc("搜索").findOne(5000);
if (!searchTab) {
    // 尝试其他方式找到搜索
    searchTab = id("com.tencent.mm:id/icon_search").findOne(3000);
}
if (!searchTab) {
    toastLog("未找到搜索按钮，请确认微信已打开");
    exit();
}
searchTab.click();
sleep(2000);

// ===== 第二步：搜索公众号 =====
toastLog("正在搜索公众号: " + accountName);
var searchInput = className("EditText").findOne(5000);
if (!searchInput) {
    toastLog("未找到搜索输入框");
    exit();
}
searchInput.setText(accountName);
sleep(2000);

// 点击搜索结果中的「公众号」分类
var accountTab = text("公众号").findOne(3000);
if (accountTab) {
    accountTab.click();
    sleep(2000);
}

// 点击公众号名称进入主页
toastLog("正在进入公众号主页...");
var accountEntry = text(accountName).findOne(5000);
if (!accountEntry) {
    toastLog("未找到公众号: " + accountName);
    exit();
}
accountEntry.click();
sleep(3000);

// ===== 第三步：点开最新一篇文章 =====
toastLog("正在打开最新文章...");
// 公众号主页的文章列表，点击第一篇
var firstArticle = id("com.tencent.mm:id/b4m").findOne(5000);
if (!firstArticle) {
    // 备用：尝试点击文章标题区域
    firstArticle = className("android.widget.ListView").findOne(3000);
    if (firstArticle) {
        firstArticle = firstArticle.child(0);
    }
}
if (!firstArticle) {
    toastLog("未找到文章，请确认公众号主页已打开");
    exit();
}
firstArticle.click();
sleep(5000); // 等待文章页面加载

// ===== 第四步：点击右上角分享 =====
toastLog("正在打开分享...");
var shareBtn = desc("更多").findOne(5000);
if (!shareBtn) {
    // 备用查找方式
    shareBtn = descContains("更多").findOne(3000);
}
if (!shareBtn) {
    // 尝试点击右上角区域
    shareBtn = id("com.tencent.mm:id/icon").findOne(3000);
}
if (!shareBtn) {
    toastLog("未找到分享按钮");
    exit();
}
shareBtn.click();
sleep(2000);

// ===== 第五步：点击「转发」 =====
toastLog("正在进入转发...");
var forwardBtn = text("转发").findOne(5000);
if (!forwardBtn) {
    toastLog("未找到转发按钮");
    exit();
}
forwardBtn.click();
sleep(2000);

// ===== 第六步：逐个搜索并勾选群 =====
for (var i = 0; i < groups.length; i++) {
    toastLog("(" + (i + 1) + "/" + groups.length + ") 选择: " + groups[i]);
    
    // 找到搜索输入框
    var selectSearchInput = className("EditText").findOne(3000);
    if (!selectSearchInput) {
        toastLog("未找到搜索框");
        exit();
    }
    
    // 清空并输入群名
    selectSearchInput.setText(groups[i]);
    sleep(2000);
    
    // 找到并点击群名（勾选）
    var groupItem = text(groups[i]).findOne(3000);
    if (!groupItem) {
        toastLog("未找到群: " + groups[i] + "，跳过");
        selectSearchInput.setText("");
        sleep(500);
        continue;
    }
    groupItem.click();
    sleep(1500);
    
    // 清空搜索框
    selectSearchInput.setText("");
    sleep(800);
}

// ===== 第七步：点击发送 =====
toastLog("全部选择完毕，正在发送...");
var sendBtn = text("发送").findOne(5000);
if (!sendBtn) {
    toastLog("未找到发送按钮");
    exit();
}
sendBtn.click();
sleep(2000);

toastLog("转发完成！共转发到 " + groups.length + " 个群");

// 返回
back();
sleep(500);
back();
sleep(500);
back();
