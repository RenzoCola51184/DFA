/* Doofinder Academy — Module 1 Section 2 content
   Section 0 is a recap of Module 1 Section 1 and section 1 is this section's
   introduction — neither has a quiz. Sections 2-7 each have a theory block
   and a quiz. Section 8 is the final guided exercise. */

const COURSE = {
  nextSection: { label: "Go to Module 1 Section 3 →", href: "section3.html" },
  storageKey: "dfa_progress_section2_v1",
  sections: [
    {
      id: 0,
      code: "0",
      moduleTag: "Module 1 Section 2",
      navGroup: "RECAP",
      navLabel: "Recap: Section 1",
      eyebrow: "0. RECAP",
      title: "Recap: Module 1 Section 1",
      hasQuiz: false,
      pages: [
        {
          intro: [
            "Before diving into <strong>Section 2</strong>, here's a quick recap of what <strong>Section 1</strong> of this module covered:"
          ],
          schema: `
            <div class="theory-block">
              <ul>
                <li><strong>Introduction</strong> — Doostride is an online footwear and streetwear store; you are Mark Park, a junior developer there, and John River, the CEO, asked you to get familiar with what Doofinder actually is and set up its Search Layer on the local demo copy of the site.</li>
                <li><strong>What is Doofinder</strong> — Doofinder is a multi-product service (Search Layer, Recommendations, Quiz Maker, AI Assistant and Category Merchandising) built around Stores and Search Engines, each identified by a Store ID and a Hash ID.</li>
                <li><strong>Installing Doofinder</strong> — the four steps to get it live: create a Store, create a Search Engine, set the CSS Selector, and add the installation script (Zone + STORE_ID) to the site.</li>
                <li><strong>CSS Selector</strong> — how to identify an element with an ID, class or name-attribute selector, using the browser's dev tools, and how to combine a desktop and a mobile selector with a comma.</li>
                <li><strong>Indices and the Data Feed</strong> — the structure behind a feed, its mandatory <code>id</code> and <code>title</code> fields, the difference between file/URL and API feeds, and Field Name Mapping for renaming or deep-mapping a feed's own fields.</li>
                <li><strong>Security Settings</strong> — Authorized Domains (an allowlist supporting wildcards and localhost) and Blocked IPs (a blocklist using CIDR ranges).</li>
                <li><strong>Final Exercise</strong> — put it all into practice: created a Store with two Search Engines (English and Spanish) for Doostride, uploaded the right data feed, fixed a forbidden-domain error and a missing Field Name Mapping, and got the Search Layer live on both storefronts.</li>
              </ul>
            </div>`
        }
      ]
    },
    {
      id: 1,
      code: "1",
      moduleTag: "Module 1 Section 2",
      sideLabel: "MODULE 1 SECTION 2",
      navGroup: "INTRODUCTION",
      navLabel: "Introduction",
      eyebrow: "1. INTRODUCTION",
      title: "Introduction",
      hasQuiz: false,
      pages: [
        {
          intro: [],
          whatsapp: {
            name: "John River",
            body: [
              "Hi Amanda,",
              "Everything good? So, I tried out the Doofinder Search Layer this morning — super cool!",
              "As you already know, our old search engine has had some issues for a while now. Could you look into how this new layer actually works, and see if there's a way to configure it so those issues get solved?"
            ],
            times: ["16:42", "16:42", "16:43"]
          },
          whatsappNote: [
            "In this section, you are <strong>Amanda House</strong>, Doostride's ecommerce manager. You joined the company as an intern and, thanks to your dedication, worked your way up to running ecommerce for the whole site. You haven't had the chance to try the Search Layer yet — the one <strong>Mark Park</strong> installed in the previous section.",
            "This afternoon you got this WhatsApp message from <strong>John River</strong>, Doostride's CEO.",
            "Before answering John, you need to actually understand how Doofinder's search decides and ranks what it shows, and how you can configure or change that."
          ],
          outro: [
            "Your goal throughout this section is to get familiar with how Doofinder's Search Layer works under the hood, so that, by the final exercise — where these issues will be listed one at a time — you can see whether it's possible to configure the Search Layer to solve them."
          ]
        }
      ]
    },
    {
      id: 2,
      code: "2",
      moduleTag: "Module 1 Section 2",
      navGroup: "HOW DOOFINDER SEARCH WORKS",
      navLabel: "How Doofinder Search Works",
      eyebrow: "2. HOW DOOFINDER SEARCH WORKS",
      title: "How Doofinder Search Works",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/search-setup/how-doofinder-search-works",
      theory: {
        blocks: [
          {
            html: `
              <div class="diagram-figure lesson-figure-left">
                <div class="theory-diagram">
                  <svg viewBox="0 0 320 320" role="img" data-action="zoom-diagram" aria-label="Diagram: the user's browser and Doofinder's servers exchange data over a WebSocket connection, while the Store's backend separately feeds the script and product feed to the browser and sends the feed for indexing to Doofinder's servers.">
                    <defs>
                      <marker id="hdw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M0,0 L10,5 L0,10 z" fill="#9aa8c4"/>
                      </marker>
                      <marker id="hdw-arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M0,0 L10,5 L0,10 z" fill="#5c6a86"/>
                      </marker>
                    </defs>
                    <rect x="135" y="15" width="170" height="85" rx="10" fill="rgba(108,182,242,0.08)" stroke="#6cb6f2" stroke-width="1.5"/>
                    <text x="220" y="42" text-anchor="middle" font-size="13" font-weight="700" fill="#eef1f7">User's browser</text>
                    <text x="220" y="62" text-anchor="middle" font-size="10.5" fill="#9aa8c4">Search Layer (JS script)</text>
                    <text x="220" y="79" text-anchor="middle" font-size="10.5" fill="#9aa8c4">User types in search box</text>
                    <rect x="135" y="215" width="170" height="85" rx="10" fill="rgba(139,212,80,0.08)" stroke="#8bd450" stroke-width="1.5"/>
                    <text x="220" y="242" text-anchor="middle" font-size="13" font-weight="700" fill="#eef1f7">Doofinder's servers</text>
                    <text x="220" y="262" text-anchor="middle" font-size="10.5" fill="#9aa8c4">Search API</text>
                    <text x="220" y="279" text-anchor="middle" font-size="10.5" fill="#9aa8c4">Search Engine (Hash ID)</text>
                    <line x1="220" y1="103" x2="220" y2="212" stroke="#9aa8c4" stroke-width="2" marker-start="url(#hdw-arrow)" marker-end="url(#hdw-arrow)"/>
                    <text x="230" y="161" text-anchor="start" font-size="10.5" font-weight="700" fill="#9aa8c4">WebSocket</text>
                    <rect x="10" y="122" width="112" height="75" rx="10" fill="rgba(255,255,255,0.03)" stroke="#5c6a86" stroke-width="1.5"/>
                    <text x="66" y="150" text-anchor="middle" font-size="11.5" font-weight="700" fill="#eef1f7">Store's backend</text>
                    <text x="66" y="168" text-anchor="middle" font-size="9.5" fill="#9aa8c4">Not part of the</text>
                    <text x="66" y="180" text-anchor="middle" font-size="9.5" fill="#9aa8c4">WebSocket</text>
                    <path d="M117,135 C130,120 130,105 133,92" fill="none" stroke="#5c6a86" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#hdw-arrow-dim)"/>
                    <path d="M117,184 C130,203 130,215 133,224" fill="none" stroke="#5c6a86" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#hdw-arrow-dim)"/>
                    <text x="66" y="107" text-anchor="middle" font-size="8.5" fill="#9aa8c4">Script</text>
                  </svg>
                </div>
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </div>
              <p>The <strong>Search Layer</strong> updates its results the moment something is typed into a site's search box. But how does it actually do that, and what decides which results show up — and in what order?</p>
                  <p>Clicking a site's search box activates the Search Layer — the client-side widget running in the user's browser — which opens a <strong>WebSocket</strong> connection directly to Doofinder's servers, pointing to the <strong>Search Engine</strong> of the web. From that point on, every time something is typed, a call is launched to Doofinder's search API. What the user types into the search box is called the <strong>query</strong> — the search term (one or more words) Doofinder has to find results for. The API responds with the items to display in the Search Layer, ranked according to certain criteria.</p>
                  <p>The Store's backend isn't part of that WebSocket connection at all — it's simply where the script that the Search Layer loads actually lives.</p>
                  <p>This module won't go into the mechanics of that connection, or the technology behind the search API itself — built on <strong>OpenSearch</strong> — but it's worth briefly touching on the different types of calls it can launch, since understanding them matters for figuring out why certain products show up for a query and others don't. These call types are covered later in this section.</p>

              <h3 style="clear: both;">What Decides the Quality of Results</h3>
              <p>Beyond the search technology Doofinder uses, the quality of the results it returns depends mainly on two things:</p>
              <table class="theory-table">
                <thead><tr><th>Factor</th><th>Why it matters</th></tr></thead>
                <tbody>
                  <tr><td><strong>The data feed's content and structure</strong></td><td>The content and structure of the <strong>data</strong> indexed in the Search Engine — if an item isn't indexed at all, it simply can't be found through search. Likewise, if an item's entry is missing a specific piece of information, it can't be found by searching for that particular detail.</td></tr>
                  <tr><td><strong>The Search Engine's configuration</strong></td><td>The Search Engine's own configuration — every Search Engine is set up around a handful of features, listed below.</td></tr>
                </tbody>
              </table>

              <h3>Search Engine Features</h3>
              <table class="theory-table">
                <thead><tr><th>Feature</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><strong>Search Fields</strong></td><td>Decides which parts of a product's data get searched, and how much weight each one carries.</td></tr>
                  <tr><td><strong>Relevance Criteria</strong></td><td>Decides the order results are displayed in, breaking ties beyond the base Score.</td></tr>
                  <tr><td><strong>Boosting</strong></td><td>Changes a product's relevance in the results, based on configuration or user behavior.</td></tr>
                  <tr><td><strong>Custom Results</strong></td><td>Includes or excludes specific items from the results of particular search terms.</td></tr>
                  <tr><td><strong>Excluded Results</strong></td><td>Intentionally removes specific items from a Search Engine's results altogether.</td></tr>
                  <tr><td><strong>Synonyms</strong></td><td>Lets a search for one term also match others that mean the same thing, even if the feed itself never uses those other words.</td></tr>
                </tbody>
              </table>
              <p>Excluded Results and Synonyms are covered in more detail later in the course.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "According to this lesson, what is the <strong>Search Layer</strong>?",
          options: [
            "A server-side script that runs on Doofinder's infrastructure",
            "A database table inside the Search Engine",
            "A configuration screen in the Admin Panel",
            "The client-side widget running in the user's browser"
          ],
          correct: 3,
          explain: "The Search Layer is described as the client-side widget running in the user's browser."
        },
        {
          q: "Once that connection is active, what happens every time a user types something?",
          options: [
            "A call is launched to <strong>Doofinder</strong>'s search API",
            "The page reloads entirely",
            "A new Search Engine is created",
            "The data feed is reindexed"
          ],
          correct: 0,
          explain: "Every time something is typed, a call is launched to <strong>Doofinder</strong>'s search API with that search query."
        },
        {
          q: "What does the Search Layer open when a user clicks the site's search box?",
          options: [
            "A new browser tab",
            "A WebSocket connection directly to Doofinder's servers, pointing to the Search Engine of the web",
            "A connection to the site's own database",
            "A download of the installation script"
          ],
          correct: 1,
          explain: "Clicking the search box activates the Search Layer — the client-side widget running in the user's browser — which opens a WebSocket connection directly to Doofinder's servers, pointing to the Search Engine of the web."
        },
        {
          q: "What does the search API respond with?",
          options: [
            "A list of Authorized Domains",
            "The installation script",
            "The products to display in the Search Layer, ranked according to certain criteria",
            "A new data feed"
          ],
          correct: 2,
          explain: "The API responds with the items to display in the Search Layer, ranked according to certain criteria."
        },
        {
          q: "Why is it worth knowing about the different types of calls the API can launch?",
          options: [
            "They determine the Store's currency",
            "They control the site's CSS",
            "They help explain why some products appear for a query and others don't",
            "They set the Search Engine's language"
          ],
          correct: 2,
          explain: "Understanding the different types of calls matters for figuring out why certain products show up for a query and others don't."
        },
        {
          q: "A product isn't listed anywhere in the data feed. What happens when a user searches for it?",
          options: [
            "It's found automatically through a Custom Result",
            "It can't be found, since the Search Engine can't search a product that isn't in the feed",
            "It's found only using Boosting",
            "It's found through Relevance Criteria"
          ],
          correct: 1,
          explain: "If a product isn't in the data feed at all, it simply can't be found through search."
        },
        {
          q: "Besides the data feed's content and structure, what else shapes the quality of search results?",
          options: [
            "The Search Engine's own configuration — Search Fields, Relevance Criteria, Boosting, Custom Results, Excluded Results and Synonyms",
            "The Store's billing plan",
            "The number of Authorized Domains",
            "The site's hosting provider"
          ],
          correct: 0,
          explain: "The other main factor is the Search Engine's own configuration, built around features like Search Fields, Relevance Criteria, Boosting, Custom Results, Excluded Results and Synonyms."
        }
      ]
    },
    {
      id: 3,
      code: "3",
      moduleTag: "Module 1 Section 2",
      navGroup: "RESULTS PREVIEW",
      navLabel: "Results Preview",
      eyebrow: "3. RESULTS PREVIEW",
      title: "Results Preview",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/test-your-search-engine/results-preview",
      extraDocs: [
        { label: "Stemming and Character Cleaning", url: "https://support.doofinder.com/troubleshooting-articles/unexpected-results", fromHeading: "Stemming and Character Cleaning" }
      ],
      theory: {
        lead: "<strong>Results Preview</strong> is the section where Doofinder's response to a query can be tested — typing in a search term and seeing exactly what the Search Layer would return for it.",
        blocks: [
          {
            html: `
              <h3>What It Shows</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 500px; max-width: 55%;">
                <img src="img/results-preview-overview.png" alt="Results Preview screen in the Admin Panel: a search bar with a Refresh button, below it Results: 56, Query type: match_all and Custom Sorting: _score, and a product list with Item, Relevance, Boosting and Score columns, each row with a + button" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>Just below the search bar, Results Preview shows the number of results, the <strong>query type</strong> launched, and whether features like Custom Results or Relevance Criteria are being applied. Below that, the products appear in the same order the Search Layer would show them — and clicking a product's <strong>"+"</strong> button shows every piece of information loaded for it, field by field, according to the uploaded data feed and the mapping applied — making it easy to see what information a product actually has loaded, without needing to check the data feed directly.</p>

              <h3>Score</h3>
              <p>Next to each product sits its <strong>Score</strong>: the total value of a product, which determines how close the result is to the search query — the more relevant the product, the higher the score. It's made of two parts:</p>
              <table class="theory-table">
                <thead><tr><th>Value</th><th>What it means</th></tr></thead>
                <tbody>
                  <tr><td><strong>Relevance</strong></td><td>The product's original score for the query, before any boosting</td></tr>
                  <tr><td><strong>Boosting</strong></td><td>The total boosting value, after every boosting factor has been applied — the feature that multiplies the original Relevance score</td></tr>
                  <tr><td><strong>Score</strong> (Total)</td><td><strong>Relevance × Boosting</strong> — e.g. 3.76 × 1.5 = 5.64</td></tr>
                </tbody>
              </table>

              <h3>Query Types</h3>
              <p>The query type indicates whether the results are an exact match for the search, an approximate one, or no match at all:</p>
              <table class="theory-table">
                <thead><tr><th>Query type</th><th>When it's launched</th><th>Example</th></tr></thead>
                <tbody>
                  <tr><td><code>match_and</code></td><td>A perfect correspondence between the search terms and the indexed ones — for single-term queries, and for multi-term ones where every term needs to be present</td><td>"Nike" → exact matches like "Nike shoes"; "red t-shirt" → products containing both words</td></tr>
                  <tr><td><code>match_or</code></td><td>A broader match: content containing at least one of the terms in a multi-term query</td><td>"red t-shirts" → "red" and "t-shirts" matched separately rather than together</td></tr>
                  <tr><td><code>fuzzy</code></td><td>No exact match between what was searched and what's indexed, typically due to a typo</td><td>"tsirt" instead of "t-shirt"</td></tr>
                  <tr><td><code>match_all</code></td><td>The entire catalogue</td><td>Shown before any term is typed, or when Custom Results are configured for that specific search</td></tr>
                </tbody>
              </table>
              <p class="theory-callout">When a search is performed with one or more terms, Doofinder first looks for products that contain all of the search terms — if that returns something, it's a <code>match_and</code>, returning only the products with those terms. If there's no <code>match_and</code>, it falls back to <code>match_or</code>; and if there's no <code>match_or</code> either, it falls back to <code>fuzzy</code>, using that same logic for returning products.</p>

              <h3>In Practice</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 340px; max-width: 55%;">
                  <img src="img/results-preview-example.png" alt="Results Preview panel for the query 'shoe', showing 159 results with query type match_and, a Synonym indicator, and the first product expanded to reveal all of its loaded fields" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>The screenshot at the start of this page shows Results Preview completely by default: no query launched, and nothing configured in that Search Engine — no Boosting, no Custom Results, no other settings changed. That's why the query type is <code>match_all</code> (the whole catalogue, 56 results) and every product has the same Relevance and Score of 1.0, with no boosting applied.</p>
                <p>Here's what this looks like in practice when a query — "shoe" — is launched in a Search Engine with Boosting Rules applied:</p>
                <ul>
                  <li>Just under the search bar, <strong>Results: 159</strong> and <strong>Query type: match_and</strong> confirm how many products matched and which query type produced them, with a shortcut to Relevance Criteria right next to it.</li>
                  <li>A <strong>Synonym</strong> indicator ("shoe, boot") shows up too, meaning the search term was expanded through a configured synonym.</li>
                  <li>Each row lists a product with its Relevance, Boosting and Total — for the first item, <strong>DR MARTENS | 1461 DMC 3-EYE SHOE | BLACK SMOOTH</strong>, Relevance is 3.76 and Boosting is 1.5, giving a Total of 5.64.</li>
                  <li>That first item is expanded, revealing every field loaded for it — price, brand, categories, description, image link and more — exactly as clicking its "+" button would show.</li>
                </ul>`
          },
          {
            heading: "Stemming and Character Cleaning",
            pageBreak: true,
            html: `
              <p><strong>Doofinder</strong>'s search, built on <strong>OpenSearch</strong>, never compares text exactly as it's written. Both the indexed products and every search term go through two filters, always in this order: <strong>stemming</strong>, then <strong>character cleaning</strong>. This is why Results Preview sometimes shows products that don't literally contain the searched term — or misses some that seem to.</p>

              <h3>Stemming</h3>
              <p>Stemming reduces each word to its root, or <strong>stem</strong>, cutting off endings such as plurals or <em>-ing</em>. Words that share a stem match each other — and the stem doesn't need to be a real word:</p>
              <table class="theory-table">
                <thead><tr><th>Words</th><th>Stem</th></tr></thead>
                <tbody>
                  <tr><td><strong>run</strong>, <strong>runs</strong>, <strong>running</strong></td><td><code>run</code></td></tr>
                  <tr><td><strong>jacket</strong>, <strong>jackets</strong></td><td><code>jacket</code></td></tr>
                  <tr><td><strong>battery</strong>, <strong>batteries</strong></td><td><code>batteri</code></td></tr>
                </tbody>
              </table>
              <p>So if the query is <strong>"run"</strong>, a product titled <strong>"Ultralight Trail Running Shoes"</strong> shows up too — "running" is indexed as <code>run</code>, exactly like the query.</p>

              <h3>Character Cleaning</h3>
              <p>Character cleaning then replaces special characters with their plain equivalent — <code>é</code> → <code>e</code>, <code>ñ</code> → <code>n</code>, <code>ü</code> → <code>u</code>, and so on. So <strong>"café"</strong> and <strong>"cafe"</strong>, or <strong>"jalapeño"</strong> and <strong>"jalapeno"</strong>, end up as the same word.</p>
              <p>So if the query is <strong>"cafe"</strong>, a product titled <strong>"Café Racer Leather Jacket"</strong> shows up too — "café" is indexed as <code>cafe</code>, exactly like the query.</p>

              <h3>Why the Order Matters</h3>
              <p class="theory-callout">The stemmer needs to read words as they're correctly written, so it runs <em>before</em> character cleaning. The side effect: a word typed without its accent may be read as a different word, and get a different stem.</p>
              <table class="theory-table">
                <thead><tr><th>Typed</th><th>After stemming</th><th>After cleaning</th><th>Result</th></tr></thead>
                <tbody>
                  <tr><td><strong>résumé</strong></td><td><code>résumé</code></td><td><code>resume</code></td><td>Matches products written as "résumé"</td></tr>
                  <tr><td><strong>resume</strong></td><td><code>resum</code></td><td><code>resum</code></td><td>Read as the verb "resume", so the final "e" gets cut — it no longer matches <code>resume</code></td></tr>
                </tbody>
              </table>`
          }
        ]
      },
      quiz: [
        {
          q: "What is Results Preview used for?",
          options: [
            "Uploading a new data feed",
            "Setting the Store's currency",
            "Creating a new Search Engine",
            "Testing <strong>Doofinder</strong>'s response to a query and seeing exactly what the Search Layer would return"
          ],
          correct: 3,
          explain: "Results Preview lets a search term be typed in to see exactly what the Search Layer would return for it."
        },
        {
          q: "How is a product's Score calculated?",
          options: [
            "Relevance multiplied by Boosting",
            "Relevance divided by Boosting",
            "Boosting minus Relevance",
            "It's always equal to Relevance"
          ],
          correct: 0,
          explain: "Score is the multiplication of Relevance and Boosting."
        },
        {
          q: "What does clicking a product's \"+\" button reveal in Results Preview?",
          options: [
            "The product's price history",
            "A list of similar products",
            "The Search Engine's Hash ID",
            "Every piece of information loaded for that product, field by field, according to the feed and mapping applied"
          ],
          correct: 3,
          explain: "The \"+\" button shows all the information loaded for a product, field by field, making it easy to check without going through the data feed directly."
        },
        {
          q: "A user searches \"red jacket\". No product contains both words, but some contain \"red\" and others \"jacket\". Which query type is launched?",
          options: ["<code>match_and</code>", "<code>match_or</code>", "<code>fuzzy</code>", "<code>match_all</code>"],
          correct: 1,
          explain: "match_and needs every term in the same product, so it returns nothing here — Doofinder falls back to match_or, which returns products containing at least one of the terms. fuzzy would only kick in if match_or found nothing either, e.g. with a typo."
        },
        {
          q: "If a query returns no <code>match_and</code> and no <code>match_or</code>, what does it fall back to?",
          options: ["Match_all", "It returns no results at all", "Fuzzy", "It retries match_and"],
          correct: 2,
          explain: "The fallback order is match_and, then match_or, and finally fuzzy, all using the same logic for returning products."
        },
        {
          q: "What does stemming do to a word?",
          options: [
            "Replaces accented characters with plain ones",
            "Corrects typos in the search term",
            "Translates it into the Search Engine's language",
            "Reduces it to its root, cutting off endings such as plurals or masculine/feminine forms"
          ],
          correct: 3,
          explain: "Stemming reduces a word to its stem — \"running\" and \"runs\" both become \"run\", so they match each other. Replacing accented characters is character cleaning, a separate filter."
        },
        {
          q: "A user searches \"jackets\". Thanks to stemming, which of these products also shows up?",
          options: [
            "A product titled \"Rain Coat\"",
            "A product titled \"Rain Jacket\"",
            "A product titled \"Jack Boots\"",
            "A product titled \"Jacquard Scarf\""
          ],
          correct: 1,
          explain: "Stemming cuts the plural off, so \"jackets\" and \"jacket\" both become the stem \"jacket\" and match each other. \"Jack\" and \"Jacquard\" only look similar — their stems are \"jack\" and \"jacquard\", so they don't match. \"Coat\" means something similar, but stemming doesn't understand meaning: that would need a synonym."
        },
        {
          q: "Why can \"resume\" (without accents) miss products written as \"résumé\"?",
          options: [
            "Character cleaning deletes words without accents",
            "Doofinder ignores words longer than 12 characters",
            "Without the accents it's read as a different word, so it gets a different stem that no longer matches",
            "Unaccented words are only searched with fuzzy"
          ],
          correct: 2,
          explain: "\"résumé\" is left whole by stemming and becomes \"resume\" after cleaning, while \"resume\" is read as the verb and cut to \"resum\" — the two differ, so the products don't match."
        }
      ]
    },
    {
      id: 4,
      code: "4",
      moduleTag: "Module 1 Section 2",
      navGroup: "SEARCH FIELDS",
      navLabel: "Search Fields",
      eyebrow: "4. SEARCH FIELDS",
      title: "Search Fields",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/search-setup/search-fields",
      theory: {
        lead: "<strong>Doofinder</strong> makes it possible to configure and choose which fields — loaded through the data feed — a Search Engine should take into account when searching for products, and how important each one is relative to the rest.",
        blocks: [
          {
            html: `
              <h3>Field Weights</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 400px; max-width: 55%;">
                  <img src="img/search-fields-advanced-preferences.png" alt="Advanced Preferences > Search Fields screen, with a warning about the impact of changes, a Field/Weight selector to add a new field, and a configured list showing brand, categories, description, df_all, gtin, mpn, title and title.autocomplete with their weights" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Each field that's selected can be assigned a weight of its own.</p>
              <p>Not every indexed field takes part in this logic, though: only text fields and a few specific ones can be used as Search Fields. The different field types will be covered in more detail later in the course.</p>
                  <p>By default, weight doesn't apply to every field, only to the ones that have been selected (weight ranges from 1 to 10). By default, the <strong>title</strong> carries a higher weight than the rest of the fields.</p>
                  <p>So, when a search is performed for a given term, among the products that have that term indexed in some field, a product with the term in its title will score higher than a product that only has it in another field.</p>
              <p>For example, take the query <strong>"waterproof"</strong> and two products: <strong>"Waterproof Hiking Jacket"</strong>, with the term in its title, and <strong>"Trail Running Shoes"</strong>, with "waterproof" only in its description. Changing the weights changes their score for that query — and with it, their order (simplified numbers, for illustration only):</p>
              <table class="theory-table">
                <thead><tr><th>Weights</th><th>Waterproof Hiking Jacket</th><th>Trail Running Shoes</th><th>First result</th></tr></thead>
                <tbody>
                  <tr><td><code>title</code> 3, <code>description</code> 1</td><td>Score 3.0</td><td>Score 1.0</td><td>The jacket</td></tr>
                  <tr><td><code>title</code> 1, <code>description</code> 3</td><td>Score 1.0</td><td>Score 3.0</td><td>The shoes</td></tr>
                </tbody>
              </table>
              <p class="theory-callout">An important factor influencing which terms surface in the results is that the larger a field's content is in the index, the more irrelevant the terms inside it become. In other words, if a keyword sits inside the <strong>description</strong>, for instance, it will be less relevant than if it sits inside a shorter field.</p>

              <h3>The df_all Field</h3>
              <p>By default, the configuration includes a field called <code>df_all</code>. This isn't a field that comes from the data feed itself — it's a field Doofinder creates automatically, which makes the Search Engine take into account every field loaded from the feed.</p>
              <p>If <code>df_all</code> is removed, the Search Engine will only search within the fields that have been explicitly selected.</p>

              <h3>Fields Outside the Data Feed</h3>
              <p>On top of a feed's own fields, there are other fields that already exist (or can be created) which don't belong to the data feed but can still be added to the Search Fields configuration:</p>
              <table class="theory-table">
                <thead><tr><th>Field</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><code>brand.autocomplete</code></td><td>Designed to search based on parts of the brand name.</td></tr>
                  <tr><td><code>id.light_explode</code></td><td>Improves relevance for searches using the <code>id</code> field.</td></tr>
                  <tr><td><code>df_all</code></td><td>Folds in the content of every field in the feed, so searches also reach fields that weren't expressly selected; since it's so broad, it should be given a low weight.</td></tr>
                  <tr><td><code>gtin.light_explode</code> and <code>mpn.light_explode</code></td><td>Let a search use parts of a product's reference number.</td></tr>
                  <tr><td><code>title.autocomplete</code></td><td>For searching based on parts of the title.</td></tr>
                  <tr><td><code>title.autocomplete_start</code></td><td>Boosts relevance for single-term searches whenever the title starts with that same word.</td></tr>
                </tbody>
              </table>
              <p>Two quick examples of how these fields work:</p>
              <table class="theory-table">
                <thead><tr><th>Field added</th><th>Query</th><th>Also finds</th></tr></thead>
                <tbody>
                  <tr><td><code>brand.autocomplete</code></td><td><strong>"das"</strong></td><td>Products whose brand is <strong>Adidas</strong> — any part of the brand name is enough, even from the middle of the word</td></tr>
                  <tr><td><code>id.light_explode</code></td><td><strong>"JKT209"</strong></td><td>The product whose <code>id</code> is <strong>JKT20931</strong> — the code can be typed partially, as long as it's read from left to right: "JKT", "JKT2" or "JKT20" work, "T20" doesn't</td></tr>
                </tbody>
              </table>
              <p>Without those two fields, the same queries would only match the complete brand name or the complete <code>id</code>.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What can be configured in Search Fields?",
          options: [
            "The Store's billing plan",
            "Which fields, loaded through the data feed, the Search Engine should take into account when searching for products, and how important each is relative to the rest",
            "Which Search Engine is currently active",
            "The layout of the Search Layer"
          ],
          correct: 1,
          explain: "Search Fields lets you choose which fields — loaded through the data feed — the Search Engine should take into account when searching for products, and their importance relative to the rest."
        },
        {
          q: "How does the size of a field's content affect the relevance of a term found inside it?",
          options: [
            "The larger the field's content, the less relevant a term inside it becomes",
            "The larger the field's content, the more relevant a term inside it becomes",
            "Field size has no effect on relevance",
            "It only affects numeric fields"
          ],
          correct: 0,
          explain: "The larger a field's content is in the index, the more irrelevant the terms within it become — a keyword in the description, for example, is less relevant than the same keyword in a shorter field."
        },
        {
          q: "What is <code>df_all</code>?",
          options: [
            "A field that must be added manually to the data feed",
            "A field automatically created by <strong>Doofinder</strong> that makes the Search Engine take into account every field loaded from the feed",
            "A setting that disables every other Search Field",
            "A fixed weight reserved for the title"
          ],
          correct: 1,
          explain: "<code>df_all</code> isn't a field coming from the data feed — <strong>Doofinder</strong> creates it automatically so the Search Engine takes into account every field that's been loaded."
        },
        {
          q: "By default, which fields does weight apply to, and on what scale?",
          options: [
            "Every field loaded from the feed, automatically",
            "Only <code>df_all</code>",
            "None, unless enabled first in Relevance Criteria",
            "Only the fields that have been selected, on a scale from 1 to 10"
          ],
          correct: 3,
          explain: "By default weight only applies to the fields that have been selected, not to every field, and it ranges from 1 to 10."
        },
        {
          q: "Search Fields has <code>brand</code> with weight 1 and <code>categories</code> with weight 4. For the query \"nomad\", product A has Nomad as its brand, and product B sits in the \"Nomad Collection\" category. Which one scores higher?",
          options: [
            "Product A, because a brand match always wins",
            "They get the same score, since both contain the term",
            "Product B, because the term sits in the field with the higher weight",
            "Neither shows up, because the term isn't in the title"
          ],
          correct: 2,
          explain: "Weight decides how much a match in each field counts: \"nomad\" appears in categories (weight 4) for product B and only in brand (weight 1) for product A, so B scores higher. There's no rule that brand always wins, and the title isn't required — any selected field can match."
        },
        {
          q: "What happens if <code>df_all</code> is removed from the configuration?",
          options: [
            "The Search Engine will only search within the fields that have been explicitly selected",
            "The Search Engine stops returning any results",
            "The title field is removed automatically as well",
            "Every remaining field gets an equal, non-editable weight"
          ],
          correct: 0,
          explain: "Without <code>df_all</code>, the Search Engine no longer reaches every loaded field — it searches only within the fields that have been explicitly selected."
        },
        {
          q: "Which field types let a search use parts of a product's reference number?",
          options: [
            "brand.autocomplete and title.autocomplete",
            "df_all and id.light_explode",
            "title.autocomplete_start and df_all",
            "gtin.light_explode and mpn.light_explode"
          ],
          correct: 3,
          explain: "gtin.light_explode and mpn.light_explode let a search use parts of a product's reference number."
        },
        {
          q: "<code>gtin.light_explode</code> has been added to Search Fields. A product's GTIN is 8412345678905. Which query finds it through that field?",
          options: [
            "\"5678905\"",
            "\"841234\"",
            "\"345678\"",
            "\"8905\""
          ],
          correct: 1,
          explain: "light_explode lets a code be typed partially, but only read from left to right: \"841234\" is the beginning of the GTIN, so it matches. \"5678905\", \"345678\" and \"8905\" are parts from the middle or the end, so they don't."
        }
      ]
    },
    {
      id: 5,
      code: "5",
      moduleTag: "Module 1 Section 2",
      navGroup: "RELEVANCE CRITERIA",
      navLabel: "Relevance Criteria",
      eyebrow: "5. RELEVANCE CRITERIA",
      title: "Relevance Criteria",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/search-setup/relevance-criteria",
      theory: {
        lead: "<strong>Relevance Criteria</strong> decides which criteria are used to sort the results a query displays.",
        blocks: [
          {
            html: `
              <h3>Sort Order</h3>
              <p>More than one criterion can be used at once, and each one gets its own sort order — the options depend on the type of criterion:</p>
              <table class="theory-table">
                <thead><tr><th>Criterion type</th><th colspan="2">Sort order options</th></tr></thead>
                <tbody>
                  <tr><td><strong>Numeric values</strong> — the order follows that number</td><td><strong>Highest to lowest</strong> — from the highest value of that criterion down to the lowest</td><td><strong>Lowest to highest</strong> — from the lowest up to the highest</td></tr>
                  <tr><td><strong>Text values</strong> — the order follows the alphabet</td><td><strong>A to Z</strong></td><td><strong>Z to A</strong></td></tr>
                </tbody>
              </table>
              <p>One special case is the <code>availability</code> field: it's a text field (usually "in stock" / "out of stock"), but it still sorts cleanly — set to <strong>A to Z</strong>, in stock items come before out of stock ones.</p>

              <h3>Default and Additional Criteria</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 420px; max-width: 55%;">
                <img src="img/relevance-criteria-default.png" alt="Advanced Preferences > Relevance criteria tab in its default configuration: a warning that changing the Score field position may decrease search quality, a single Score field set to Highest to Lowest, an Add field button and a Save button" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>By default, there's only one criterion: <strong>Score</strong>, configured as <strong>Highest to lowest</strong>. So the more score an item has, the higher up it's displayed in the list.</p>
              <p>Up to five criteria can be added. The extra ones are fields indexed from the feed — for example, <code>price</code>, <code>title</code> or <code>categories</code> — as long as they aren't <strong>Keyword</strong>-type fields, such as <code>id</code> (field types will be covered later in the course).</p>
              <p class="theory-callout">It's recommended to always keep <strong>Score</strong> in first position, set to <strong>Highest to lowest</strong>, and never remove it: the search depends on it to work properly, and so do other promotional tools such as <strong>Boosting</strong> and <strong>Custom Results</strong>. The Admin Panel itself warns about it: "Changing the Score field position may decrease search quality".</p>

              <h3>Why the Order Matters</h3>
              <p class="theory-callout">Criteria are applied one after the other, in the order they're listed: if products tie on the first criterion, the second one decides between them, and so on. That's why the order in which the criteria are listed affects how results end up arranged.</p>
              <figure class="lesson-figure lesson-figure-left" style="width: 340px; max-width: 55%;">
                  <img src="img/relevance-criteria-score-price.png" alt="Relevance Criteria screen with Score listed first (Highest to lowest) and best_price listed second (Highest to lowest)" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>With a Relevance Criteria configuration like this one — <strong>Score</strong> (Highest to lowest) listed first, then <strong>best_price</strong> (Highest to lowest) — products are sorted from the highest score to the lowest, and products that share the same score are then sorted by price, from highest to lowest.</p>
              <p>For example, with these four products: Product C comes first with the highest score; Products B and A tie on score, so the higher price puts B ahead of A; Product D, with the lowest score, comes last.</p>
              <table class="theory-table">
                <thead><tr><th>Position</th><th>Product</th><th>Score</th><th>best_price</th></tr></thead>
                <tbody><tr><td>1</td><td><strong>Product C</strong></td><td>7</td><td>50</td></tr><tr><td>2</td><td><strong>Product B</strong></td><td>5</td><td>120</td></tr><tr><td>3</td><td><strong>Product A</strong></td><td>5</td><td>80</td></tr><tr><td>4</td><td><strong>Product D</strong></td><td>3</td><td>80</td></tr></tbody>
              </table>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-right" style="width: 340px; max-width: 55%;">
                  <img src="img/relevance-criteria-price-score.png" alt="Relevance Criteria screen with best_price listed first (Highest to lowest) and Score listed second (Highest to lowest)" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>With the criteria in the opposite order instead — <strong>best_price</strong> (Highest to lowest) first, then <strong>Score</strong> (Highest to lowest) — items are sorted from the highest price to the lowest, and products that share the same price are then sorted by score, from highest to lowest.</p>
              <p>With the same four products: Product B now comes first with the highest price; Products A and D tie on price, so the higher score puts A ahead of D; Product C, the cheapest, drops to last despite having the highest score.</p>
              <table class="theory-table">
                <thead><tr><th>Position</th><th>Product</th><th>Score</th><th>best_price</th></tr></thead>
                <tbody><tr><td>1</td><td><strong>Product B</strong></td><td>5</td><td>120</td></tr><tr><td>2</td><td><strong>Product A</strong></td><td>5</td><td>80</td></tr><tr><td>3</td><td><strong>Product D</strong></td><td>3</td><td>80</td></tr><tr><td>4</td><td><strong>Product C</strong></td><td>7</td><td>50</td></tr></tbody>
              </table>`
          }
        ]
      },
      quiz: [
        {
          q: "What does Relevance Criteria decide?",
          options: [
            "Which fields get indexed from the data feed",
            "Which fields the search engine looks at when matching a query",
            "Which criteria are used to sort the results a query displays",
            "How many results a query returns"
          ],
          correct: 2,
          explain: "Relevance Criteria decides which criteria are used to sort the results displayed for a query."
        },
        {
          q: "Can more than one criterion be used at the same time, and how is each one configured?",
          options: [
            "No, only one criterion can ever be active",
            "Yes, but all of them must share the same sort order",
            "Yes — more than one can be used, and each one gets its own sort order",
            "Yes, but a maximum of two at a time"
          ],
          correct: 2,
          explain: "More than one criterion can be used at once, and each one gets its own sort order — Highest to lowest / Lowest to highest for numeric values, A to Z / Z to A for text."
        },
        {
          q: "For a criterion represented by numeric values and set to Highest to lowest, how are items ordered?",
          options: [
            "From the lowest value of that criterion up to the highest",
            "From the highest value of that criterion down to the lowest",
            "Alphabetically, A to Z",
            "Randomly among tied values"
          ],
          correct: 1,
          explain: "For a numeric criterion, Highest to lowest sorts items from the highest value of that criterion down to the lowest."
        },
        {
          q: "How is a criterion that uses text values ordered?",
          options: [
            "A to Z or Z to A",
            "Always from shortest text to longest",
            "By numeric value only",
            "It can't be used as a sorting criterion"
          ],
          correct: 0,
          explain: "Criteria with text values are ordered following the alphabet — A to Z or Z to A."
        },
        {
          q: "By default, what single criterion does Relevance Criteria use, and how is it configured?",
          options: [
            "Price, Lowest to highest",
            "Title, A to Z",
            "Categories, Z to A",
            "Score, Highest to lowest"
          ],
          correct: 3,
          explain: "By default there's only one criterion, Score, set to Highest to lowest — so the more score an item has, the higher up it's displayed."
        },
        {
          q: "At most how many criteria can be added, and what can the extra ones be?",
          options: [
            "Up to five, using text fields only",
            "Up to five, using fields indexed from the feed, such as price, title or categories",
            "Up to three, using any field at all",
            "Unlimited, as long as they're numeric"
          ],
          correct: 1,
          explain: "Up to five criteria can be added, and the extra ones are fields indexed from the feed, like price, title or categories."
        },
        {
          q: "Can a Keyword-type field, such as <code>id</code>, be added as an extra Relevance Criteria field?",
          options: [
            "Yes, id is the recommended second criterion",
            "Yes, but only after removing Score",
            "No — extra criteria can't be Keyword-type fields, such as id",
            "There's no restriction on which fields can be added"
          ],
          correct: 2,
          explain: "Extra criteria have to be fields indexed from the feed that aren't Keyword-type — id, for example, can't be used."
        },
        {
          q: "With Relevance Criteria set to Score (Highest to lowest) then best_price (Highest to lowest), how are two products with the same score ordered relative to each other?",
          options: [
            "By price, from highest to lowest",
            "By price, from lowest to highest",
            "Alphabetically by title",
            "Randomly"
          ],
          correct: 0,
          explain: "The order of the criteria matters: once Score ties, the next criterion — best_price, Highest to lowest — decides, sorting the tied products from the highest price to the lowest."
        }
      ]
    },
    {
      id: 6,
      code: "6",
      moduleTag: "Module 1 Section 2",
      navGroup: "BOOSTING",
      navLabel: "Boosting",
      eyebrow: "6. BOOSTING",
      title: "Boosting",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/promotional-tools/boosting",
      theory: {
        lead: "<strong>Boosting</strong> is a system that multiplies the score of items regardless of the query search being made — a decimal number, a multiplier, that combined with the item's natural score modifies its final score.",
        blocks: [
          {
            html: `
              <h3>How Boosting Changes Positions</h3>
              <p>By default, if no search query is being made, a <code>match_all</code> query is launched, rendering all the indexed items in the results (unless some of them are being excluded — but that's covered later in the course).</p>
              <p>The score of all the items is <strong>1</strong>, and if Relevance Criteria is set to only Score, the order of appearance is given solely by the indexation order, as we saw in one of the previous lessons.</p>
              <p>But if we put a boosting (a multiplier) on the "natural" score of a given product, that product's natural position will change:</p>
              <table class="theory-table">
                <thead><tr><th>Boosting value</th><th>Effect</th></tr></thead>
                <tbody>
                  <tr><td><strong>Positive</strong> (for example, <strong>1.5</strong>)</td><td>The product will appear in first position</td></tr>
                  <tr><td><strong>Negative</strong> — a negative boosting can also be given, using a number between <strong>0.1</strong> and <strong>0.9</strong></td><td>The product will appear in last position</td></tr>
                  <tr><td><strong>0</strong></td><td>Using a boosting of 0 removes it from every type of search</td></tr>
                </tbody>
              </table>
              <p>For example, with no query launched, four products all start with a score of 1:</p>
              <table class="theory-table">
                <thead><tr><th>Product</th><th>Boosting</th><th>Final score</th><th>Position</th></tr></thead>
                <tbody>
                  <tr><td><strong>Canvas Tote Bag</strong></td><td>1.5</td><td>1 × 1.5 = 1.5</td><td>First</td></tr>
                  <tr><td><strong>Denim Jacket</strong></td><td>—</td><td>1</td><td>Second</td></tr>
                  <tr><td><strong>Wool Scarf</strong></td><td>0.5</td><td>1 × 0.5 = 0.5</td><td>Last</td></tr>
                  <tr><td><strong>Straw Hat</strong></td><td>0</td><td>—</td><td>Removed from the results</td></tr>
                </tbody>
              </table>

              <h3>How the Multiplier Works</h3>
              <p class="theory-callout">It's a multiplier applied regardless of the query launched. This also means that if, for a given search, that same product doesn't appear in the results list, that multiplier won't have any influence on the final score. That is, it can't make the product appear if it isn't in the natural list of products for a given query. This also means that if a product has a low score for a given query, even if a boosting is applied, it's not guaranteed that product will appear in first position.</p>
              <p>For example, for the query <strong>"boots"</strong>:</p>
              <table class="theory-table">
                <thead><tr><th>Product</th><th>Relevance</th><th>Boosting</th><th>Final score</th><th>Result</th></tr></thead>
                <tbody>
                  <tr><td><strong>Leather Boots</strong></td><td>4</td><td>—</td><td>4</td><td>First</td></tr>
                  <tr><td><strong>Rain Boots</strong></td><td>2</td><td>1.5</td><td>2 × 1.5 = 3</td><td>Second — the boost raises its score, but not enough to pass Leather Boots</td></tr>
                  <tr><td><strong>Wool Scarf</strong></td><td>—</td><td>3</td><td>—</td><td>Not shown — it doesn't match "boots", so its boost has nothing to multiply</td></tr>
                </tbody>
              </table>
              <p>If a very high boosting is given to a given product, there's a risk of putting it in first position in every search where it appears, even if naturally it wouldn't be relevant in some of them.</p>

              <h3>Four Ways to Apply It</h3>
              <p>There are four ways to apply it:</p>
              <table class="theory-table">
                <thead><tr><th>Type</th><th>How it works</th></tr></thead>
                <tbody>
                  <tr><td><strong>Manual Boosting</strong></td><td>The possibility of applying a boosting to a single product, as seen previously.</td></tr>
                  <tr><td><strong>Boosting Rules</strong></td><td>The possibility of applying a boosting to every product that matches given conditions. The conditions are related to the indexed fields, several conditions can be applied at once, and the boosting can be set to apply to products that meet all of those conditions or at least one of them.</td></tr>
                  <tr><td><strong>Automatic Boosting</strong></td><td>An option that, when active, automatically adds boost to products that, over the last 15 days, have been clicked and viewed more than the average of all products.</td></tr>
                  <tr><td><strong>Boosting Through Data Feed</strong></td><td>By indexing the <code>df_manual_boost</code> field, a manual boosting can be applied to products directly through indexation, and it overwrites whatever manual boost was set in the Admin Panel.</td></tr>
                </tbody>
              </table>
              <figure class="lesson-figure lesson-figure-left" style="width: 224px; max-width: 55%;">
                  <img src="img/boosting-rules-edit-example.png" alt="Edit Boosting Rule panel named 'Expensive Shoes' with a Boost value of 1.5, Search Terms disabled, and conditions requiring all results to match categories Is Shoes and best_price Not in range 0.0–100.0" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Here's what a Boosting Rule looks like once configured: this one, named <strong>Expensive Shoes</strong>, applies a <strong>1.5</strong> boost to every product that has "shoes" indexed as its category and a best price of 100 or more.</p>
              <p>Reading the panel from top to bottom:</p>
              <ul>
                <li><strong>Status</strong> is on, so the rule is active.</li>
                <li><strong>Boost</strong> is <strong>1.5</strong> — the multiplier applied to every product the rule matches.</li>
                <li><strong>Search Terms</strong> is switched off, so the rule isn't tied to specific searches and applies to every search.</li>
                <li><strong>Results match all conditions</strong> is selected, so a product needs to meet both conditions at once: <code>categories</code> <strong>is</strong> Shoes, and <code>best_price</code> <strong>Not in range</strong> 0.0–100.0.</li>
              </ul>

              <h3>Combining Them</h3>
              <p class="theory-callout">These four ways apply simultaneously to the final score. Combining a manual boosting of <strong>1.5</strong> with a Boosting Rules value of another <strong>1.5</strong> takes a product's initial score of <strong>1</strong> up to <strong>2.25</strong>: 1 × 1.5 × 1.5 = 2.25.</p>
              <figure class="lesson-figure lesson-figure-right" style="width: 440px; max-width: 55%;">
                  <img src="img/boosting-final-score-example.png" alt="Results Preview row for a product showing an info tooltip with Automatic boosting: -, Manual boosting: 1.5, Boosting rules: 1.5, and Final Boosting: 1.5 x 1.5 = 2.25, next to a Total of 2.25" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Results Preview breaks that total down the same way, listing each boosting source next to the final multiplication that produced the product's Total score.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What does a boosting factor do to a product's existing relevance score?",
          options: [
            "It replaces the score entirely",
            "It only affects the product's price",
            "It only applies to out of stock products",
            "It multiplies the score, pushing the product up or down the results"
          ],
          correct: 3,
          explain: "A boosting factor multiplies a result's existing score, moving that product further up or down the list."
        },
        {
          q: "In Manual Boosting, what does a value below 1.0 (but above 0) do to a product?",
          options: ["Lowers its ranking", "Raises its ranking", "Removes it from results entirely", "Has no effect"],
          correct: 0,
          explain: "In Manual Boosting, values above 1.0 raise a product's ranking, while values below 1.0 (but above 0) lower it."
        },
        {
          q: "What does Automatic Boosting reward?",
          options: [
            "Products added most recently to the feed",
            "Products with the lowest price",
            "Products that have been performing well recently, based on a balance of visits and clicks",
            "Products with the most fields filled in"
          ],
          correct: 2,
          explain: "Automatic Boosting rewards products that have been performing well recently, using a recent (last 15 days) balance of visits and clicks, and only applies to above-average performers."
        },
        {
          q: "What's the risk of giving a very high boosting to a product?",
          options: [
            "The product gets removed from every search",
            "It can end up in first position in every search where it appears, even where it wouldn't naturally be relevant",
            "The boosting is ignored above a value of 10",
            "Every other product in the catalogue loses its score"
          ],
          correct: 1,
          explain: "Since boosting multiplies the score in every search where the product appears, a very high value can push it to the top even for searches where it isn't really relevant. It doesn't remove the product (only 0 does that) and it doesn't touch other products' scores."
        },
        {
          q: "If <code>df_manual_boost</code> is set in the feed and a manual boost was also set in the Admin Panel, what happens?",
          options: [
            "Both are averaged together",
            "The Admin Panel value always wins",
            "<strong>Doofinder</strong> throws an error and ignores both",
            "The feed value overwrites the Admin Panel value"
          ],
          correct: 3,
          explain: "<code>df_manual_boost</code>, coming from the feed (or API), overwrites whatever manual boost value was set through the Admin Panel."
        },
        {
          q: "No query has been launched, so every product has a score of 1. A <strong>Sun Visor</strong> gets a boosting of 0.7 and no other product is boosted. Where does the Sun Visor appear?",
          options: [
            "In last position",
            "In first position",
            "It disappears from the results",
            "Its position doesn't change"
          ],
          correct: 0,
          explain: "0.7 is a negative boosting (between 0.1 and 0.9): its score becomes 1 × 0.7 = 0.7, lower than everyone else's 1, so it drops to last. Only a boosting of 0 removes a product, and a value above 1 would push it to first."
        },
        {
          q: "For the query \"sandals\", <strong>Beach Sandals</strong> has a Relevance of 6 and no boost, while <strong>Sport Sandals</strong> has a Relevance of 3 and a boosting of 1.5. Which one comes first?",
          options: [
            "Sport Sandals, because it's the only boosted product",
            "Beach Sandals, because 6 is still higher than 3 × 1.5 = 4.5",
            "They tie, because boosting evens out the scores",
            "Sport Sandals, because boosting always guarantees first position"
          ],
          correct: 1,
          explain: "Boosting multiplies the existing score: Sport Sandals goes from 3 to 4.5, which still isn't enough to pass Beach Sandals' 6. Boosting never guarantees first position — it depends on the natural score it multiplies."
        },
        {
          q: "A <strong>Floor Rug</strong> has a boosting of 5. A user searches \"desk lamp\", and the rug doesn't match that query at all. What happens?",
          options: [
            "It appears in first position thanks to its high boost",
            "It appears in last position",
            "It doesn't appear — its boost has nothing to multiply for that query",
            "It appears only if Relevance Criteria is set to Score"
          ],
          correct: 2,
          explain: "Boosting can't make a product appear if it isn't in the natural results for that query: the rug doesn't match \"desk lamp\", so no matter how high its boost is, it isn't shown."
        },
        {
          q: "A product has a Relevance of 2 for a query. It has a Manual Boosting of 2 and also matches a Boosting Rule of 1.5. What's its final score?",
          options: [
            "5.5, because the boosts are added up",
            "6, because 2 × 2 × 1.5 = 6",
            "4, because only the highest boost counts",
            "3, because only the Boosting Rule applies"
          ],
          correct: 1,
          explain: "The different ways of boosting apply simultaneously and multiply each other: 2 × 2 × 1.5 = 6. They're never added up, and one doesn't cancel the other."
        }
      ]
    },
    {
      id: 7,
      code: "7",
      moduleTag: "Module 1 Section 2",
      navGroup: "CUSTOM RESULTS",
      navLabel: "Custom Results",
      eyebrow: "7. CUSTOM RESULTS",
      title: "Custom Results",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/promotional-tools/custom-results",
      theory: {
        lead: "<strong>Custom Results</strong> is a feature to force, in a systematic way, the arrangement of products in the results list for one or several queries, also having the possibility of excluding items and/or adding items that wouldn't otherwise appear in the products list for a given query.",
        blocks: [
          {
            html: `
              <h3>Match Types</h3>
              <p>The query can be configured in two ways:</p>
              <table class="theory-table">
                <thead><tr><th>Match type</th><th>When the Custom Result is displayed</th></tr></thead>
                <tbody>
                  <tr><td><strong>Exact Match</strong></td><td>Only if the user types the exact search term or terms chain.</td></tr>
                  <tr><td><strong>Broad Match</strong></td><td>If the text typed by the user contains the set search term.</td></tr>
                </tbody>
              </table>
              <p>For example, with the search term <strong>"sunglasses"</strong>:</p>
              <table class="theory-table">
                <thead><tr><th>User types</th><th>Exact Match</th><th>Broad Match</th></tr></thead>
                <tbody>
                  <tr><td><strong>sunglasses</strong></td><td>Displayed</td><td>Displayed</td></tr>
                  <tr><td><strong>ray-ban sunglasses</strong></td><td>Not displayed — it isn't the exact term</td><td>Displayed — the text contains "sunglasses"</td></tr>
                </tbody>
              </table>

              <h3>Including and Excluding Items</h3>
              <p>The way of including or excluding items from queries through Custom Results is similar to what we saw in Boosting Rules. That is, it can be applied at the level of individual products, or at the level of a group of products that meet given conditions — dictated by the indexed fields and their values, exactly as in Boosting Rules.</p>
              <p>Within a rule, conditions can be combined:</p>
              <table class="theory-table">
                <thead><tr><th>Condition</th><th>How it happens</th><th>Example</th></tr></thead>
                <tbody>
                  <tr><td><strong>AND</strong></td><td>Automatically, as soon as two filters with different attributes are used together</td><td>Category "Shoes" and color "blue" only matches items that are both</td></tr>
                  <tr><td><strong>OR</strong></td><td>By adding two or more values in the same row</td><td>Color "blue" or "red" in the same rule matches items with either one</td></tr>
                  <tr><td><strong>AND + OR</strong></td><td>Both can be combined at once</td><td>Category "Shoes" whose color is "blue" or "red" mixes an AND (category + color) with an OR (blue vs red) in the same rule</td></tr>
                </tbody>
              </table>
              <figure class="lesson-figure lesson-figure-left" style="width: 280px; max-width: 55%;">
                <img src="img/custom-results-and-rule.png" alt="Include Rule pop-up with two conditions on separate rows: categories SHOES and brand NIKE, with an Add condition button and an Add rule button" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p class="theory-callout">"And" logic can't be applied twice to the same field within one rule — though a field can still hold more than one value.</p>
              <p>This rule has two conditions on two different fields — <code>categories</code> is SHOES and <code>brand</code> is NIKE — so it's an <strong>AND</strong>: only Nike shoes enter the list. A pair of Adidas shoes or a Nike cap wouldn't match.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-right" style="width: 280px; max-width: 55%;">
                <img src="img/custom-results-or-rule.png" alt="Include Rule pop-up with a single brand condition holding three values in the same row: ADIDAS, NIKE and VANS" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>This rule has three values in the same row of the same field — <code>brand</code> is ADIDAS, NIKE or VANS — so it's an <strong>OR</strong>: any product from any of those three brands enters the list.</p>
              <p>Within the same Custom Result, several rules can be applied (individual items or rules), and the arrangement of products depends on the disposition of these rules.</p>
              <div style="clear: both;"></div>

              <h3>Display and Duration</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 420px; max-width: 55%;">
                <img src="img/custom-results-form.png" alt="Custom Result form with numbered fields: 1 Name, 2 Status toggle, 3 Duration (ongoing or set date period), 4 Display results (only the selected results, or the selected results first then natural results), 5 Search Terms with Exact Match and Add term, 6 Included results and 7 Excluded results, each with an Add results button" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>Custom Results allows choosing between <strong>Display only the selected results</strong> or <strong>Display the selected results first, then natural results</strong>.</p>
              <p>For example, a Custom Result for "sunglasses" includes three products:</p>
              <ul>
                <li>With <strong>Display only the selected results</strong>, the search shows those three products and nothing else.</li>
                <li>With <strong>Display the selected results first, then natural results</strong>, the three products come first, followed by every other product that naturally matches "sunglasses".</li>
              </ul>
              <p>Custom Results can be applied for a specific period, or it can always be active.</p>

              <h3 style="clear: both;">An Example</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 290px; max-width: 55%;">
                <img src="img/custom-results-example-config.png" alt="Custom Result configured with the Exact Match search terms sun accesories, sunnies and sunglasses; Included results Ray-Ban Unisex Sunglasses, Ray-Ban Andy Sunglasses and Gucci GG Round Acetate Sunglasses; Excluded results Gucci Web GG Rectangular Flat-Top Acetate Sunglasses" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>This Custom Result is triggered by three Exact Match search terms — "sun accesories", "sunnies" and "sunglasses". It includes three products, in this order: Ray-Ban Unisex Sunglasses, Ray-Ban Andy Sunglasses and Gucci GG Round Acetate Sunglasses. It also excludes one: Gucci Web GG Rectangular Flat-Top Acetate Sunglasses.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-right" style="width: 260px; max-width: 55%;">
                <img src="img/custom-results-example-layer.png" alt="Search Layer for the query sunglasses showing Products (3): Ray-Ban Unisex Sunglasses, Ray-Ban Andy Sunglasses and Gucci GG Round Acetate Sunglasses, in that order" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>Searching <strong>"sunglasses"</strong> in the Search Layer, the three included products show up in exactly that order, and the excluded Gucci Web GG model doesn't appear at all. The <strong>Products (3)</strong> count at the top of the results confirms it: for this search, the Search Layer returns only the three products included by the Custom Result.</p>`
          },
          {
            heading: "Combining Relevance Criteria, Boosting and Custom Results",
            pageBreak: true,
            html: `
              <p>These three features can be active at the same time. For a given search, the products may be sorted according to Relevance Criteria, a Custom Result may be forcing certain items into (or out of) that list, and some of those items may also carry a boost. Since they overlap, it's worth being precise about how they interact — and which one has the final word.</p>
              <h3>Custom Results and Relevance Criteria</h3>
              <p class="theory-callout">Custom Results decides which products enter the list, but not necessarily how they're ordered. The arrangement a Custom Result sets is only preserved while <strong>Score</strong> is the <em>first</em> Relevance Criteria. As soon as a different field is placed first, that field takes over and re-sorts the forced products, regardless of the order Custom Results gave them — a criterion listed after Score, on the other hand, never gets the chance to do that.</p>
              <p>Take a Custom Result that forces this order, with both products indexed at the same score:</p>
              <table class="theory-table">
                <thead><tr><th>Position</th><th>Product</th><th>Category</th><th>Score</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td><strong>Product A</strong></td><td>Shoes</td><td>X</td></tr>
                  <tr><td>2</td><td><strong>Product B</strong></td><td>Jeans</td><td>X</td></tr>
                </tbody>
              </table>
              <p>With Relevance Criteria set to <strong>Category (A → Z)</strong> first and <strong>Score (Highest to lowest)</strong> second, Category overrides the Custom Result's order, and "Jeans" now sorts ahead of "Shoes":</p>
              <table class="theory-table">
                <thead><tr><th>Position</th><th>Product</th><th>Category</th><th>Score</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td><strong>Product B</strong></td><td>Jeans</td><td>X</td></tr>
                  <tr><td>2</td><td><strong>Product A</strong></td><td>Shoes</td><td>X</td></tr>
                </tbody>
              </table>
              <p>Had Category been left in second place instead, behind Score, nothing would have changed — with Score first, the two products already tie, and the original Custom Result order stands.</p>
              <h3>Custom Results and Boosting</h3>
              <p class="theory-callout">Boosting can't touch the order among products a Custom Result has already forced into the list — those products carry a score that Custom Results itself fixes, and boosting has no effect on it. What boosting can still do is reorder products through Relevance Criteria, wherever a Custom Result isn't already deciding the arrangement.</p>
              <p>Take three products with no Custom Result involved, all sharing the same score, sorted by <strong>Category (Z → A)</strong> first and <strong>Score (Highest to lowest)</strong> second:</p>
              <table class="theory-table">
                <thead><tr><th>Position</th><th>Product</th><th>Category</th><th>Score</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td><strong>Product C</strong></td><td>Shoes</td><td>1</td></tr>
                  <tr><td>2</td><td><strong>Product D</strong></td><td>Jeans</td><td>1</td></tr>
                  <tr><td>3</td><td><strong>Product E</strong></td><td>Jeans</td><td>1</td></tr>
                </tbody>
              </table>
              <p>Category already keeps the Shoes product on top, ahead of both Jeans products, so a boost applied to Product E can't move it past Product C. But between the two Jeans products, Category can't break the tie — that's left to Score — so boosting Product E is enough to move it ahead of Product D:</p>
              <table class="theory-table">
                <thead><tr><th>Position</th><th>Product</th><th>Category</th><th>Score</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td><strong>Product C</strong></td><td>Shoes</td><td>1</td></tr>
                  <tr><td>2</td><td><strong>Product E</strong></td><td>Jeans</td><td>1.5 (boosted)</td></tr>
                  <tr><td>3</td><td><strong>Product D</strong></td><td>Jeans</td><td>1</td></tr>
                </tbody>
              </table>`
          }
        ]
      },
      quiz: [
        {
          q: "What is the purpose of Custom Results?",
          options: [
            "To include or exclude specific items from search results for particular terms",
            "To automatically reorder every result by price",
            "To translate product titles",
            "To generate the installation script"
          ],
          correct: 0,
          explain: "Custom Results let specific items be included in or excluded from the results shown for particular search terms."
        },
        {
          q: "What's the difference between Included results and Excluded results?",
          options: [
            "They're the same list, shown twice",
            "Included results only works with rules, Excluded results only with individual products",
            "Excluded results only applies to out of stock products",
            "Included results adds specific products to the results; Excluded results removes them"
          ],
          correct: 3,
          explain: "Included results and Excluded results share the same structure — added individually or via rules — but one adds products to a Custom Result's results and the other removes them."
        },
        {
          q: "A rule requires <code>categories</code> is Backpacks and <code>brand</code> is Herschel, on two separate rows. Which condition logic is this?",
          options: ["Or", "Broad Match", "And", "Exact Match"],
          correct: 2,
          explain: "And conditions require every filter to be satisfied at once — here, both categories = Backpacks and brand = Herschel."
        },
        {
          q: "A Custom Result has the search term \"running shoes\" set as <strong>Broad Match</strong>. A user types \"red running shoes\". Is the Custom Result displayed?",
          options: [
            "No, because the user typed an extra word",
            "Yes, because the typed text contains \"running shoes\"",
            "Only if Relevance Criteria is set to Score",
            "Only if \"red\" is also added as a search term"
          ],
          correct: 1,
          explain: "Broad Match displays the Custom Result whenever the typed text contains the set search term — \"red running shoes\" contains \"running shoes\". With Exact Match it wouldn't be displayed, since the user didn't type the exact term."
        },
        {
          q: "A Custom Result has the search term \"gift card\" set as <strong>Exact Match</strong>. Which search displays it?",
          options: [
            "\"gift card\"",
            "\"gift card 50\"",
            "\"birthday gift card\"",
            "All three"
          ],
          correct: 0,
          explain: "Exact Match only displays the Custom Result when the user types the exact search term. \"gift card 50\" and \"birthday gift card\" contain it, but that's only enough with Broad Match."
        },
        {
          q: "An Include rule has two rows: <code>categories</code> is Boots, and <code>color</code> is black or brown (both values in the same row). Which product enters the list?",
          options: [
            "Black sneakers",
            "Red boots",
            "A brown belt",
            "Brown boots"
          ],
          correct: 3,
          explain: "Two different fields combine as an AND (category Boots and a matching color), while the two values in the same row work as an OR (black or brown). Only brown boots meet both: the sneakers and the belt aren't Boots, and the red boots don't have one of the two colors."
        },
        {
          q: "A Custom Result for \"backpack\" includes two products and is set to <strong>Display the selected results first, then natural results</strong>. What does the search show?",
          options: [
            "Only the two included products",
            "The natural results first, then the two included products",
            "The two included products first, then the other products that naturally match \"backpack\"",
            "The two included products mixed randomly among the natural results"
          ],
          correct: 2,
          explain: "With this option the selected products come first and the natural results follow. \"Display only the selected results\" would show the two products and nothing else."
        },
        {
          q: "A Custom Result forces Product X (category \"Wallets\") first and Product Y (category \"Belts\") second, both with the same score. Relevance Criteria is set to <strong>Category (A to Z)</strong> first, then <strong>Score (Highest to lowest)</strong>. Which one appears first?",
          options: [
            "Product X, because the Custom Result always keeps its order",
            "Product Y, because Category is the first criterion and \"Belts\" sorts before \"Wallets\"",
            "Neither, because Custom Results and Relevance Criteria can't be active together",
            "Product X, because Score breaks the tie"
          ],
          correct: 1,
          explain: "The order a Custom Result sets is only preserved while Score is the first Relevance Criteria. Here Category comes first, so it re-sorts the forced products A to Z and \"Belts\" goes ahead of \"Wallets\"."
        }
      ]
    },
    {
      id: 8,
      code: "8",
      moduleTag: "Final Exercise",
      sideLabel: "FINAL EXERCISE",
      navGroup: "FINAL EXERCISE",
      navLabel: "Final Exercise",
      eyebrow: "8. FINAL EXERCISE",
      title: "Fixing Doostride's Search Layer Relevance",
      hasQuiz: true,
      quizLabel: "Guided Exercise",
      exerciseType: "wizard",
      theory: {
        lead: "Time to put everything you've learned into practice!",
        blocks: [
          {
            html: `
              <p>This final exercise is about fixing fundamental issues that the old search engine simply couldn't be configured to solve.</p>
              <p>Throughout the exercise, each of these issues will be presented one at a time. For every one, you'll need to pick the best strategy to solve it — using one of the features covered in this section — and then configure that feature correctly.</p>`
          }
        ]
      },
      exercise: {
        lead: `You open the <strong>Admin Panel</strong> and start digging into the old search engine's issues, one at a time.</p>
          <ul>
            <li>Figure out why <strong>out of stock</strong> products sometimes rank in the first positions.</li>
            <li>Figure out why searching "comfortable nike" surfaces the <strong>NIKE | SWOOSH PRO FLAT PEAK CAP</strong> before any actual Nike shoe.</li>
            <li>Figure out why searching "Baseball Hat" also returns shoes or socks.</li>
            <li>Make sure products with an active <strong>discount</strong> get more visibility across the whole store, not just on specific searches.</li>
          </ul>`,
        doneNote: "All four issues are fixed — Doostride's search now puts in stock, on-brand and discounted products where they belong.",
        replyButtonLabel: "Reply to John",
        phases: [
          {
            key: "problem-features",
            title: "1. Picking the right feature for each problem",
            question: "Before touching any configuration, you go back over the four issues you found and work out which <strong>Doofinder</strong> feature, among the ones you've learned so far — <strong>Search Fields</strong>, <strong>Relevance Criteria</strong>, <strong>Boosting</strong> and <strong>Custom Results</strong> — is the right tool for each one.</p><ul style=\"margin:0 0 16px; padding-left:20px;\"><li style=\"margin-bottom:14px;\"><strong>Problem 1:</strong> On some searches, out of stock products showed up before ones that were actually in stock, and even among in stock products, pricier items tended to rank above cheaper ones. You need a feature that lets in stock products always show up before out of stock ones — no matter the search term — while also sorting by price from cheapest to most expensive, but only as a tiebreak: a cheaper, less relevant product still shouldn't outrank a pricier one that's more relevant.</li><li style=\"margin-bottom:14px;\"><strong>Problem 2:</strong> The store's main products are shoes, ideally from Nike or Adidas — but there was no way to make shoes from these brands more important than the rest of the products. You need a feature that gives extra relevance to products with these characteristics, while still letting other products outrank them whenever a specific search makes them more relevant.</li><li style=\"margin-bottom:14px;\"><strong>Problem 3:</strong> Looking at the old engine's stats, you found plenty of searches like \"shoes on sale\" and \"shoes discounted\" — but their results weren't limited to Doostride's actually discounted shoes. You need a feature that lets you force what shows up for these specific searches, if needed even by picking the products by hand.</li><li><strong>Problem 4:</strong> Every product has a reference code made of 4 blocks — category, brand, color and size. For example, <code>SHODRMBLA005</code> means a pair of shoes (<code>SHO</code>) from the Dr Martens brand (<code>DRM</code>), in black (<code>BLA</code>) and size 5 (<code>005</code>). You want the team to be able to search by just part of that code: typing <code>SHOCON</code> should find every Shoes product from Converse, and <code>SHODRMRED</code> every red Shoes product from Dr Martens — without anyone needing to type the complete code. You need a feature that makes this possible.</li></ul><p class=\"theory-lead\" style=\"margin-bottom:16px;\">For each problem below, choose the most suitable feature to solve it. Each feature can only be used once — the same feature can't solve more than one problem:",
            fields: [
              { key: "problem1", label: "Problem 1", type: "select", options: ["Boosting", "Custom Results", "Relevance Criteria", "Search Fields"], correct: "Relevance Criteria" },
              { key: "problem2", label: "Problem 2", type: "select", options: ["Boosting", "Custom Results", "Relevance Criteria", "Search Fields"], correct: "Boosting" },
              { key: "problem3", label: "Problem 3", type: "select", options: ["Boosting", "Custom Results", "Relevance Criteria", "Search Fields"], correct: "Custom Results" },
              { key: "problem4", label: "Problem 4", type: "select", options: ["Boosting", "Custom Results", "Relevance Criteria", "Search Fields"], correct: "Search Fields" }
            ],
            explain: "<strong>Relevance Criteria</strong> fixes the first problem: it decides the order in which results are displayed, adding extra sorting criteria on top of Score. <strong>Boosting</strong> fixes the second: it makes certain products more relevant than the rest, whatever is searched. <strong>Custom Results</strong> fixes the third: it forces which products are shown for specific searches. <strong>Search Fields</strong> fixes the fourth: it controls which fields are searched and how. In the next steps, you'll work out how to configure each of these."
          },
          {
            key: "relevance-criteria-fields",
            title: "2. Relevance Criteria — Part 1",
            question: "Quick reminder of what needs fixing: in some searches, products that can't be bought right now appear above the ones that are available, and among the available ones the more expensive products tend to come first. The goal is for available products to come first whatever the user searches for, with relevance still deciding the order among them — and price, from cheapest to most expensive, only settling the cases where two products are equally relevant.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Before working out the priority order, you first need to decide which fields belong in Relevance Criteria.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">These are the fields available. Click every field that should be part of Relevance Criteria, then click Continue:",
            fields: [
              { key: "rc_fields", label: "", type: "multi-choice", options: ["availability", "best_price", "brand", "category", "color", "description", "gender", "Score", "size", "title"], correct: ["Score", "availability", "best_price"] }
            ],
            explain: "You need exactly three fields in Relevance Criteria: the default <strong>Score</strong>, which keeps relevance deciding the order; <strong>availability</strong>, to separate the products in stock from the ones out of stock; and <strong>best_price</strong>, to sort by price. The other fields don't solve any part of this problem, so they stay out. How to sort each one, and in which order, is what you'll work out in the next step."
          },
          {
            key: "relevance-criteria-config",
            title: "2. Relevance Criteria — Part 2",
            question: "You want in stock products to always show up first — no matter how relevant they are to the search term — and, whenever two products tie on that, the cheapest one should come first.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze these 4 images, each showing a different Relevance Criteria configuration, and choose the one that gets you what you want:",
            fields: [
              { key: "correctconfig", type: "image-select", layout: "column", thumbCols: 2, stacked: true, options: [
                { value: "a", src: "img/relevance-criteria-final-a.png", alt: "Relevance Criteria with availability (A to Z) first, Score (Highest to lowest) second, best_price (Lowest to highest) third", caption: "Option A" },
                { value: "b", src: "img/relevance-criteria-final-b.png", alt: "Relevance Criteria with best_price (Lowest to highest) first, Score (Highest to lowest) second, availability (A to Z) third", caption: "Option B" },
                { value: "c", src: "img/relevance-criteria-final-c.png", alt: "Relevance Criteria with Score (Highest to lowest) first, availability (A to Z) second, best_price (Lowest to highest) third", caption: "Option C" },
                { value: "d", src: "img/relevance-criteria-final-d.png", alt: "Relevance Criteria with availability (A to Z) first, best_price (Lowest to highest) second, Score (Highest to lowest) third", caption: "Option D" }
              ], correct: "a" }
            ],
            explain: "Option A is correct: with availability listed first (A to Z, so \"in stock\" sorts before \"out of stock\"), in stock products always come first regardless of relevance — Score only breaks ties between products with the same availability, and best_price only breaks ties left after that. Options B and C put Score or best_price ahead of availability, so out of stock products could still outrank in stock ones whenever they score higher or cost less. Option D puts best_price before Score, so among in stock products the cheapest one wins the tie instead of the most relevant one — the wrong tiebreak order."
          },
          {
            key: "boosting-fields",
            title: "3. Boosting — Part 1",
            question: "Quick reminder of what needs fixing: the shoes from Doostride's two leading brands are its most important products, yet nothing makes them stand out — other, less important products keep ranking above them whatever is searched. The goal is to give those shoes extra weight in every search, while still letting another product come first when a search makes it clearly more relevant.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">You decide to set up a <strong>Boosting Rule</strong> that gives those main products more relevance than the rest, for every search.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">These are the indexed fields. Click every field the Boosting Rule should use to identify those products, then click Continue:",
            fields: [
              { key: "br_fields", label: "", type: "multi-choice", options: ["availability", "brand", "calculated_discount", "category", "color", "description", "gender", "price", "size", "title"], correct: ["brand", "category"] }
            ],
            explain: "The main products are defined by two things: what kind of product they are and which brand makes them — so the rule needs <strong>category</strong> and <strong>brand</strong>. The other fields describe characteristics that products of any kind or brand can share, so they don't identify the main products and stay out. Basing the rule on the products' own fields, rather than on specific search terms, is what makes it apply to every search. In the next step, you'll work out exactly how to set it up."
          },
          {
            key: "boosting-config",
            title: "3. Boosting — Part 2",
            question: "You now need to actually build the <strong>Boosting Rule(s)</strong> around <strong>category</strong> = <strong>Shoes</strong> and <strong>brand</strong> = <strong>Nike or Adidas</strong>.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze these 3 images, each showing a different Boosting configuration, and choose the one that gets you what you want:",
            fields: [
              { key: "correctconfig", type: "image-select", layout: "column", thumbCols: 2, thumbAspect: "2.45", stacked: true, options: [
                { value: "a", src: "img/boosting-final-a.png", alt: "Two separate Global Boosting Rules: SHOES with condition categories is Shoes and boost 2.0, and NIKE / ADIDAS with condition brand is ADIDAS, NIKE and boost 1.5, both enabled", caption: "Option A" },
                { value: "b", src: "img/boosting-final-b.png", alt: "Two separate Global Boosting Rules: SHOES with condition categories is Shoes and boost 2.0, and NIKE / ADIDAS with condition brand is ADIDAS AND brand is NIKE and boost 1.5, both enabled", caption: "Option B" },
                { value: "c", src: "img/boosting-final-c.png", alt: "A single Global Boosting Rule, SHOES NIKE / ADIDAS, with condition categories is Shoes AND brand is ADIDAS, NIKE and boost 2.0, enabled", caption: "Option C" }
              ], correct: "a" }
            ],
            explain: "Option A is correct: two separate Global rules — <strong>SHOES</strong> (categories is Shoes, boost 2.0) and <strong>NIKE / ADIDAS</strong> (brand is ADIDAS, NIKE — meaning either one, boost 1.5) — stack multiplicatively. Any shoe gets the 2.0 boost, any Nike or Adidas product gets the 1.5 boost, and a Nike or Adidas shoe gets both at once, ranking it above a shoe from another brand or a Nike/Adidas accessory like the cap. Option B uses <strong>brand is ADIDAS AND brand is NIKE</strong> instead of the comma-separated \"is one of\" list — a single product's brand can never equal both at once, so that rule can never match anything and never fires. Option C folds both conditions into one rule with a single flat boost of 2.0: it only rewards the exact intersection (a shoe that's also Nike or Adidas) and gives nothing to a Nike/Adidas accessory or to another brand's shoe, losing the two independent, stackable signals you actually want."
          },
          {
            key: "custom-results-filter",
            title: "4. Custom Results — Part 1",
            question: "Quick reminder of what needs fixing: users who search for shoes on sale get results that aren't limited to the shoes that are actually discounted. The goal is for those searches to show exactly the discounted shoes — and to keep doing so on their own as discounts come and go.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">You decide to set up a <strong>Custom Result</strong> for those searches. Instead of picking products by hand — a list that would go stale as soon as a discount starts or ends — you want it to automatically show whichever shoes are discounted at any given moment.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">These are the indexed fields. Click every field the Custom Result should use to find those products, then click Continue:",
            fields: [
              { key: "cr_fields", label: "", type: "multi-choice", options: ["availability", "brand", "calculated_discount", "category", "gender", "price", "sale_price", "size", "title"], correct: ["calculated_discount", "category"] }
            ],
            explain: "The products to show are defined by two things: they have a discount, and they are shoes — so the Custom Result needs <strong>calculated_discount</strong> and <strong>category</strong>. <strong>price</strong> and <strong>sale_price</strong> only say how much a product costs, not whether it's discounted right now, and the other fields don't identify discounted shoes either, so they stay out. Since it's a filter rather than a hand-picked list, the Custom Result stays accurate on its own as discounts start and end. In the next step, you'll see how this looks once it's actually configured."
          },
          {
            key: "custom-results-config",
            title: "4. Custom Results — Part 2",
            question: "You now need to actually build the <strong>Custom Result</strong>, named \"SHOES IN SALE\" and scoped to the exact-match terms \"shoes on sale\" and \"shoes discounted\", around <strong>calculated_discount</strong> (0 to 100) and <strong>category</strong> = <strong>Shoes</strong>.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze these 4 images, each showing a different configuration, and choose the one that gets you what you want:",
            fields: [
              { key: "correctconfig", type: "image-select", layout: "column", thumbCols: 2, stacked: true, options: [
                { value: "a", src: "img/custom-results-final-a.png", alt: "Display only the selected results, with a single Included results row: items whose calculated_discount field is between 0.0 and 100.0, and whose categories field is Shoes — matches 27", caption: "Option A" },
                { value: "b", src: "img/custom-results-final-b.png", alt: "Display the selected results first, then natural results, with a single Included results row: items whose calculated_discount field is between 0.0 and 100.0, and whose categories field is Shoes — matches 27", caption: "Option B" },
                { value: "c", src: "img/custom-results-final-c.png", alt: "Display only the selected results, but with two separate Included results rows: items whose categories field is Shoes (matches 157), and items whose calculated_discount field is between 0.0 and 100.0 (matches 30)", caption: "Option C" },
                { value: "d", src: "img/custom-results-final-d.png", alt: "Display the selected results first, then natural results, with the same two separate Included results rows as Option C: categories is Shoes (matches 157) and calculated_discount between 0.0 and 100.0 (matches 30)", caption: "Option D" }
              ], correct: "a" }
            ],
            explain: "Option A is correct: <strong>Display only the selected results</strong> keeps \"shoes on sale\" and \"shoes discounted\" showing nothing but the 27 items matching both conditions at once, combined into a single rule (calculated_discount between 0.0 and 100.0 <strong>and</strong> categories is Shoes). Option B uses the right single combined rule but sets Display to \"selected results first, then natural results\" — that mixes in every other natural result underneath, so the search would still show plenty of non-discounted or non-shoe products further down. Options C and D split the same two conditions into two separate rows instead of one combined rule — that turns the logic into <strong>categories is Shoes (157 matches) OR calculated_discount is between 0.0 and 100.0 (30 matches)</strong>, a much broader, mostly wrong set that includes every shoe whether it's discounted or not, plus every discounted product regardless of category. D compounds that mistake with the same wrong Display setting as B."
          },
          {
            key: "search-fields-config",
            title: "5. Search Fields",
            question: "Analyze the 5 images above, each showing a different Search Fields configuration, and choose the one that gets you what you want:",
            fields: [
              { key: "correctconfig", type: "image-select", layout: "column", thumbCols: 4, thumbAspect: "1.65", stacked: true, mediaWidth: 1000,
                trailingNote: "Quick reminder of what needs fixing: Doostride's catalogue now has an <strong>mpn</strong> field: 4 three-character blocks — category, brand, color and size — like <code>SHODRMBLA005</code> for a size 5 black Dr Martens shoe. You want the team to search by just <strong>part</strong> of that code: typing <code>SHOCON</code> should find every <strong>Shoes</strong> product from <strong>Converse</strong>, and <code>SHODRMRED</code> every red <strong>Shoes</strong> product from <strong>Dr Martens</strong> — without anyone typing the full code.",
                options: [
                { value: "a", src: "img/search-fields-final-a.png", alt: "Search Fields with brand 2, categories 2, description 1, df_all 1, gtin 1, mpn 1, mpn.light_explode 1, title 3, title.autocomplete 1", caption: "Option A" },
                { value: "b", src: "img/search-fields-final-b.png", alt: "Search Fields with brand 2, categories 2, description 1, df_all 1, gtin 1, mpn 8, title 8, title.autocomplete 1 — no mpn.light_explode field at all", caption: "Option B" },
                { value: "c", src: "img/search-fields-final-c.png", alt: "Search Fields with brand 2, categories 2, df_all 1, gtin 1, id.light_explode 1, mpn 1, title 3, title.autocomplete 1 — id.light_explode instead of mpn.light_explode, and no description field", caption: "Option C" },
                { value: "d", src: "img/search-fields-final-d.png", alt: "Search Fields with brand 2, brand.autocomplete 1, categories 2, color 1, df_all 1, gtin 1, mpn 1, title 3, title.autocomplete 1 — no light_explode field of any kind", caption: "Option D" },
                { value: "e", src: "img/search-fields-final-e.png", alt: "Search Fields with brand 2, brand.autocomplete 1, categories 2, color 1, df_all 1, gtin 1, mpn 1, size 1, title 3, title.autocomplete 1 — same as Option D plus a size field, still no light_explode field of any kind", caption: "Option E" }
              ], correct: "a" }
            ],
            explain: "Option A is correct: it keeps every existing field as it was and simply adds <strong>mpn.light_explode</strong> with a weight of 1, which is exactly what unlocks partial-code matches like <code>SHOCON</code> or <code>SHODRMRED</code> without disturbing anything else. Option B skips <code>mpn.light_explode</code> entirely and instead cranks up the weight of plain <strong>mpn</strong> (and <strong>title</strong>) to 8 — a huge, risky weight change that still only rewards the complete code, since a bigger weight doesn't add the ability to match a partial one. Option C adds <code>id.light_explode</code> instead of <code>mpn.light_explode</code> — the wrong field, since it unpacks the <strong>id</strong> field, not <strong>mpn</strong>, so partial mpn codes still won't match — and it also drops <strong>description</strong> from the list entirely. Options D and E don't add any <code>light_explode</code> field at all; they add <code>brand.autocomplete</code> and <code>color</code> instead (E also throws in <code>size</code>), which help with other kinds of searches but do nothing for a compound code with no word boundaries to split on."
          },
          {
            key: "check-results",
            title: "6. Checking the Results",
            question: "Time to put it all into practice. The images below show the correct configuration for each feature — recreate every one of them from the Doofinder Admin Panel, only in the English Search Engine, the one with Hash ID <span class=\"live-hash-en\" data-fallback=\"you saved in the final exercise of the previous section\"></span>.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">The questions below can only be answered by looking at <strong>Results Preview</strong> once all four features are configured — so the exercise can't be completed without setting them up for real.",
            beforeFields: `
              <div class="feed-preview-grid">
                <div class="feed-preview-card">
                  <p class="feed-preview-label">Relevance Criteria</p>
                  <div style="position: relative;"><img src="img/relevance-criteria-final-a.png" alt="Relevance Criteria with availability (A to Z) first, Score (Highest to lowest) second, best_price (Lowest to highest) third" data-action="zoom-image" class="feed-preview-img"><p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p></div>
                </div>
                <div class="feed-preview-card">
                  <p class="feed-preview-label">Boosting</p>
                  <div style="position: relative;"><img src="img/boosting-final-a.png" alt="Two separate Global Boosting Rules: SHOES with condition categories is Shoes and boost 2.0, and NIKE / ADIDAS with condition brand is ADIDAS, NIKE and boost 1.5, both enabled" data-action="zoom-image" class="feed-preview-img"><p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p></div>
                </div>
                <div class="feed-preview-card">
                  <p class="feed-preview-label">Custom Results</p>
                  <div style="position: relative;"><img src="img/custom-results-final-a.png" alt="Custom Result showing only the selected results, with a single Included results row: calculated_discount between 0.0 and 100.0 and categories is Shoes" data-action="zoom-image" class="feed-preview-img"><p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p></div>
                </div>
                <div class="feed-preview-card">
                  <p class="feed-preview-label">Search Fields</p>
                  <div style="position: relative;"><img src="img/search-fields-final-a.png" alt="Search Fields with brand 2, categories 2, description 1, df_all 1, gtin 1, mpn 1, mpn.light_explode 1, title 3, title.autocomplete 1" data-action="zoom-image" class="feed-preview-img"><p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p></div>
                </div>
              </div>`,
            fields: [
              { key: "comfortpos", label: "After configuring everything, you run a few tests in Results Preview. When you search \"comfort\", in which position does the product with id 37938304254122 appear?", type: "select", options: ["7", "12", "23", "35", "48", "56"], correct: "12" },
              { key: "comfortwhy", label: "Why does that product appear for the query \"comfort\"?", type: "choice", layout: "column", options: [
                "Because the Boosting Rule on Nike products forces it into the results",
                "Because it's a fuzzy match, as if \"comfort\" were a typo",
                "Because of stemming: its description contains \"comfortable\", which shares the stem \"comfort\" with the query",
                "Because a Custom Result includes it for the query \"comfort\""
              ], correct: "Because of stemming: its description contains \"comfortable\", which shares the stem \"comfort\" with the query" }
            ],
            explain: "The product doesn't contain the word \"comfort\" as such: its description says \"comfortable\". Stemming reduces both words to the same stem, <code>comfort</code>, so the product matches the query — Boosting can't make a product appear if it doesn't match, there's no typo involved, and no Custom Result is set up for \"comfort\". With all four configurations in place, Results Preview shows it in 12th position."
          }
        ],
        replyWhatsapp: {
          name: "Amanda House",
          outgoing: true,
          body: [
            "Hi John,",
            "Good news — I looked into how the new Search Layer works and managed to fix all the issues we had with the old search engine.",
            "Products that are in stock now always show up before the ones that are sold out, and among them the cheaper ones come first when two products are equally relevant.",
            "Our Nike and Adidas shoes now get more visibility in every search, so they no longer end up below less important products.",
            "When someone searches for shoes on sale, they now see exactly the shoes that are discounted — and it updates on its own whenever a discount starts or ends.",
            "And the team can now find a product by typing just the beginning of its reference code, without needing the full code.",
            "I'm still getting the hang of how the search works, but little by little it's starting to make sense. Happy to walk you through it whenever works for you.",
            "Best,<br>Amanda"
          ],
          times: ["18:12", "18:12", "18:13", "18:13", "18:14", "18:15", "18:16", "18:16"]
        }
      }
    }
  ]
};
