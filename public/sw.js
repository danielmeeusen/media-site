if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let _={};const r=e=>a(e,c),o={module:{uri:c},exports:_,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),_)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/UGNI8_Gj6hhtAmOHkcbN-/_buildManifest.js",revision:"7f495739b78753c57f62e5d1fae8c28a"},{url:"/_next/static/UGNI8_Gj6hhtAmOHkcbN-/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/103-e8dbe0a7b3f3098c.js",revision:"e8dbe0a7b3f3098c"},{url:"/_next/static/chunks/300-b244ccf2710d2f76.js",revision:"b244ccf2710d2f76"},{url:"/_next/static/chunks/638.5c0fd92ece893923.js",revision:"5c0fd92ece893923"},{url:"/_next/static/chunks/754-87f02d89d3108a4d.js",revision:"87f02d89d3108a4d"},{url:"/_next/static/chunks/806-e6cb883ea8c56178.js",revision:"e6cb883ea8c56178"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"5f4595e5518b5600"},{url:"/_next/static/chunks/main-ab8f884a08dc1816.js",revision:"ab8f884a08dc1816"},{url:"/_next/static/chunks/pages/404-6516cc56775deaf9.js",revision:"6516cc56775deaf9"},{url:"/_next/static/chunks/pages/_app-d96f46d030e6a7c5.js",revision:"d96f46d030e6a7c5"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/about-5e659ff925d12576.js",revision:"5e659ff925d12576"},{url:"/_next/static/chunks/pages/contact-a7b00661c6345467.js",revision:"a7b00661c6345467"},{url:"/_next/static/chunks/pages/dashboard-8876857e12cd87be.js",revision:"8876857e12cd87be"},{url:"/_next/static/chunks/pages/index-b6203d69ef5acdb8.js",revision:"b6203d69ef5acdb8"},{url:"/_next/static/chunks/pages/post/%5BpostId%5D-37c322552799ee47.js",revision:"37c322552799ee47"},{url:"/_next/static/chunks/pages/post/members/%5BpostId%5D-e5aa1ca124b25a50.js",revision:"e5aa1ca124b25a50"},{url:"/_next/static/chunks/pages/privacy-b8a241734be83726.js",revision:"b8a241734be83726"},{url:"/_next/static/chunks/pages/recover-password-1aee4c26fa5c11bc.js",revision:"1aee4c26fa5c11bc"},{url:"/_next/static/chunks/pages/recover-password/%5Btoken%5D-83ccb58d1fee1e9c.js",revision:"83ccb58d1fee1e9c"},{url:"/_next/static/chunks/pages/results-d3f678181530aca6.js",revision:"d3f678181530aca6"},{url:"/_next/static/chunks/pages/send-verification/%5Busername%5D-031d0a50c5f2c4b7.js",revision:"031d0a50c5f2c4b7"},{url:"/_next/static/chunks/pages/sent-b952a8b36b7be2fc.js",revision:"b952a8b36b7be2fc"},{url:"/_next/static/chunks/pages/settings-f342459f3f9f8184.js",revision:"f342459f3f9f8184"},{url:"/_next/static/chunks/pages/verify-email/%5Btoken%5D-ec3a037980dd0f27.js",revision:"ec3a037980dd0f27"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-17b60f12243c7130.js",revision:"17b60f12243c7130"},{url:"/icon/android-chrome-192x192.png",revision:"b168ebf496a0b367b8282ed51ea0a78b"},{url:"/icon/android-chrome-512x512.png",revision:"960f3bcb73ac09cb58ac026fa51838d4"},{url:"/icon/apple-touch-icon.png",revision:"bd93b82c08f30b69ce0997a57e4e2efa"},{url:"/icon/favicon-16x16.png",revision:"e9a140293d9663fcd4ce7a62b45dcdec"},{url:"/icon/favicon-32x32.png",revision:"00c73d1b68df2d83408670d6ef5f8aa5"},{url:"/icon/favicon.ico",revision:"0bd90c49464d0657a2c553804546d982"},{url:"/image/BeanEater.png",revision:"61f18e4bf56f3bf66c26bf4b070d8346"},{url:"/image/BeanEater.svg",revision:"086e817facd3e2fa202188e72cf3e610"},{url:"/image/thumbsup.gif",revision:"46b14533f1304e9dd154a505b958aa17"},{url:"/image/tommyboy-whatyoudo.gif",revision:"2f54e611851aef6a208f7d87af59668b"},{url:"/manifest.webmanifest",revision:"0930fc6c23e0696170769e98c8ca6fd2"},{url:"/splashscreens/10.2__iPad_landscape.png",revision:"f247323972b1ea501cc3f00941a3d72c"},{url:"/splashscreens/10.2__iPad_portrait.png",revision:"a917ef368d9d0b01dbacff0903f74948"},{url:"/splashscreens/10.5__iPad_Air_landscape.png",revision:"69e9c34cc3fca0244114a99b192af408"},{url:"/splashscreens/10.5__iPad_Air_portrait.png",revision:"cbc7fae9e42a50cc43028f11e09cac96"},{url:"/splashscreens/10.9__iPad_Air_landscape.png",revision:"601ae78e3bdc6b1c33a9cd1f9140df53"},{url:"/splashscreens/10.9__iPad_Air_portrait.png",revision:"30113d66be4056bcb8fb6cf303f65955"},{url:"/splashscreens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",revision:"e3baec49fb4536cae33a4382ea8df517"},{url:"/splashscreens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",revision:"7ef115efddc6ccaac8e9ef5bc489a173"},{url:"/splashscreens/12.9__iPad_Pro_landscape.png",revision:"1fdcd4806158fa065895e03e99ac32e2"},{url:"/splashscreens/12.9__iPad_Pro_portrait.png",revision:"5a376e8a9648160ecfe8bac0c7a3ec12"},{url:"/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",revision:"a1592ad2a08c5f0f9f92609a140006f4"},{url:"/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",revision:"34e390ba5021ddcbf65867395798455e"},{url:"/splashscreens/8.3__iPad_Mini_landscape.png",revision:"04770aa6792cf47dfaa02ce9d863e0d3"},{url:"/splashscreens/8.3__iPad_Mini_portrait.png",revision:"998301b04f33eabd511d9c69a583000c"},{url:"/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",revision:"ce89e35764477d340a4f759d123a62f7"},{url:"/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",revision:"37278d1afcba186a9eace51cf51b8d0f"},{url:"/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",revision:"e0f202481a7ea0bdd0db7b4769cf06ad"},{url:"/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",revision:"12ec8ca77c0e3408c4dfe6874c9bdac1"},{url:"/splashscreens/iPhone_11__iPhone_XR_landscape.png",revision:"cbab0c6b5dd78ab8fd1fb8547e83c279"},{url:"/splashscreens/iPhone_11__iPhone_XR_portrait.png",revision:"6b71e32eafa02b427ce29a12ad602fde"},{url:"/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",revision:"1cc699c48e5709ad2b07fb2ffdbc6724"},{url:"/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",revision:"3845ac4358825d63dc1b6355a4033d9b"},{url:"/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",revision:"536ff4053947279b06283307d30ea191"},{url:"/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",revision:"2acfe03713f01e4d115ca30680d8b183"},{url:"/splashscreens/iPhone_14_Pro_Max_landscape.png",revision:"69d95212befca55161b2894783eb2723"},{url:"/splashscreens/iPhone_14_Pro_Max_portrait.png",revision:"05fec0d69a343ed2f488bff4210fcd30"},{url:"/splashscreens/iPhone_14_Pro_landscape.png",revision:"b3deda4887edd46919a850c8ed2387bd"},{url:"/splashscreens/iPhone_14_Pro_portrait.png",revision:"2b8cc1478de5cbc8fa6c62e7bb13d97e"},{url:"/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",revision:"93466097c6f6b26cfcdf9c0687e4ad0e"},{url:"/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",revision:"404189511a44771bfc87fb417170d695"},{url:"/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",revision:"7650a7c0425bec31ac1659e98e4d3814"},{url:"/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",revision:"743201b39f4cf09c3bbd6634cee2d021"},{url:"/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",revision:"a5ea0c972d9c7d1926860a9f7d18f83f"},{url:"/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",revision:"6b697e8efe665d7da0a355a7ebf4f8e4"},{url:"/splashscreens/icon.png",revision:"38b28ef12b90ac7bb0cf4b697366e104"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
