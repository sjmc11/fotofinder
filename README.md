Enjoyed working on this, was cool little hackathon project for a Sunday. Thanks for reviewing. 

# Task notes

- Moved the auth guard into a router 'middleware' using beforeEnter hook.

- Created assets directory & included tailwind with compiler

- Created pageHeading component

- Included global appHeader component for nav

- Included background blobs as global component for visual touch

- Split views/components into separate directories

- Photo element uses a click event to handle navigating to single, although vue prevents reloading an active route; it's more implicit to wrap the element in a <router-link> when it needs to navigate away. If the click function wasn't a router push then handling like this would indeed be my approach, very tomato-tomaeto observation admittedly but more implicit IMO.

- Ideally would do a test request to Unsplash on auth submit to ensure API key is valid.

- Ideally would add an error handler to all axios requests, if authentication failure wipe the client_id value & kick to auth page.

- Ideally use a separate component for pagination that utilised prop/emits

- Search function added to PhotoService http handler

- Sure I'm forgetting plenty, be happy to walk-through and discuss decisions and approach :) 