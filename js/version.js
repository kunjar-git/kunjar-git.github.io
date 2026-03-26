// 版本号 - 每次更新时递增，用于强制刷新缓存
const APP_VERSION = '1.0.3';
const LAST_UPDATE = '2026-03-26 10:20';

// 检查缓存版本
(function() {
    const cachedVersion = localStorage.getItem('appVersion');
    
    if (cachedVersion !== APP_VERSION) {
        console.log('🔄 检测到新版本，清除旧缓存...');
        localStorage.setItem('appVersion', APP_VERSION);
        
        // 可选：清除其他缓存数据
        // localStorage.clear();
    }
})();
