/**
 * Service worker do mini game
 * @author Luiz Fernando
 */

// Instalação (cache "armazenamento local")
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                cache.add('/jokenpo/')
                cache.add('/jokenpo/manifest.json')
                cache.add('/jokenpo/index.html')
                cache.add('/jokenpo/style.css')
                cache.add('/jokenpo/app.js')
                cache.add('/jokenpo/img/papel.png')
                cache.add('/jokenpo/img/pedra.png')
                cache.add('/jokenpo/img/tesoura.png')
                cache.add('/jokenpo/img/pc.png')
                cache.add('/jokenpo/img/pcpapel.png')
                cache.add('/jokenpo/img/pcpedra.png')
                cache.add('/jokenpo/img/pctesoura.png')
            })
    )
})
// Ativação
self.addEventListener('activate', (event) => {
    console.log("Ativando o service worker...", event)
    return self.clients.claim()
})
// Interceptação (solicitações https servindo em cache quando off-line)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
})