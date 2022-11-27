# Task notes


- Moved the auth guard into a router 'middleware' using beforeEnter hook.

- Created assets directory & included tailwind with compiler

- Created pageHeader componenet

- Split views/components into separate directories

- Photo element uses a click event to handle navigating to single, although vue prevents reloading an active route; it's more implicit to wrap the element in a <router-link> when it needs to navigate away. If the click function wasn't a router push then handling like this would indeed be my approach, very tomato-tomaeto observation admittedly but more implicit IMO.

- Ideally would do a test request to Unsplash on auth submit to ensure API key is valid.

- Ideally would add an error handler to all axios requests, if authentication failure wipe the client_id value & kick to auth page.

- Ideally use a separate component for pagination that utilised prop/emits

- Search function added to PhotoService http handler