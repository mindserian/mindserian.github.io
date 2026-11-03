/* Laman Minda v1.3.4: the old v0.3 offline copy is no longer used.
   This worker clears the old copy saved on phones, removes itself, then reloads open pages. */
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(c){return caches.delete(c)}))}).then(function(){return self.registration.unregister()}).then(function(){return self.clients.matchAll({type:'window'})}).then(function(cs){cs.forEach(function(c){try{c.navigate(c.url)}catch(x){}})}))});
self.addEventListener('fetch',function(){});
