const CACHE_NAME = `triathlon-app`
const CONTENT_TO_CACHE = [
    "./index.html",
    "./src/main.jsx",
    "./src/App.jsx",
    "./src/components/forms/add_athlete_form.jsx",
    "./src/components/forms/edit_athlete_form.jsx",
    "./src/components/tables_and_storage/cache_speed.jsx",
    "./src/components/tables_and_storage/athlete_list.jsx",
    "./src/components/tables_and_storage/db_and_localstorage.jsx",
    "./src/components/tools/timer.jsx",
    "./src/components/tools/athlete_finder.jsx",
    "./src/components/tools/speed_calculator.jsx",
    "./src/model/stopwatch.js",
    "./src/model/duration.js",
    "./src/model/database.js",
    "./src/model/athlete.js",
    "./src/model/triathlon.js",
    "./src/view/triathlon_view.jsx",
    "./src/viewmodel/triathlon_viewmodel.js",
    "./icons/icon183.jpg",
    "./icons/icon200.png",
    "./icons/icon512.png",
    "./icons/icon612.jpg",
]

// Use the install event to pre-cache all initial resources.
self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const CACHE = await caches.open(CACHE_NAME)
            await CACHE.addAll(CONTENT_TO_CACHE)
        })()
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const CACHE = await caches.open(CACHE_NAME)

            // Get the resource from the cache.
            const CACHED_RESPONSE = await CACHE.match(event.request)
            if (CACHED_RESPONSE) {
                return CACHED_RESPONSE
            } else {
                try {
                    // If the resource was not in the cache, try the network.
                    const FETCH_RESPONSE = await fetch(event.request)

                    // Save the resource in the cache and return it.
                    CACHE.put(event.request, FETCH_RESPONSE.clone())
                    return FETCH_RESPONSE
                } catch (e) {
                    // The network failed.
                }
            }
        })()
    )
})
