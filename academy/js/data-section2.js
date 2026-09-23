/* Doofinder Academy — Module 1 Section 2 content
   Section 0 is a recap of Module 1 Section 1 and section 1 is this section's
   introduction — neither has a quiz. Sections 2-7 each have a theory block
   and a quiz. Section 8 is the final guided exercise. */

const COURSE = {
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
                <li><strong>Introduction</strong> — Doostride is an online footwear and streetwear store; you are Mark Park, a junior developer there, and John Smith, the CEO, asked you to get familiar with what Doofinder actually is and set up its Search Layer on the local demo copy of the site.</li>
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
            name: "John Smith",
            body: [
              "Hi Amanda,",
              "Everything good? So, I tried out the Doofinder Search Layer this morning — super cool!",
              "As you already know, our old search engine has had some issues for a while now. Could you look into how this new layer actually works, and see if there's a way to configure it so those issues get solved?"
            ],
            times: ["16:42", "16:42", "16:43"]
          },
          whatsappNote: [
            "In this section, you are <strong>Amanda House</strong>, Doostride's ecommerce manager. You joined the company as an intern and, thanks to your dedication, worked your way up to running ecommerce for the whole site. You haven't had the chance to try the Search Layer yet — the one <strong>Mark Park</strong> installed in the previous section.",
            "This afternoon you got this WhatsApp message from <strong>John Smith</strong>, Doostride's CEO.",
            "Before answering John, you need to actually understand how Doofinder's search decides and ranks what it shows, and how you can configure or change that.",
            "Your goal throughout this section is to get familiar with how Doofinder's Search Layer works under the hood, so that, by the final exercise, you can diagnose and fix the issues John raised."
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
        lead: "Results change the moment something is typed into the search bar. But how does the <strong>Search Layer</strong> actually do that, and what decides which results show up — and in what order?",
        blocks: [
          {
            html: `
              <div class="diagram-split">
                <div class="diagram-figure">
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
                <div class="diagram-note">
                  <p>Clicking a site's search box activates the Search Layer — the client-side widget running in the user's browser — which opens a <strong>WebSocket</strong> connection directly to Doofinder's servers, pointing to the <strong>Search Engine</strong> of the web. From that point on, every time something is typed, a call is launched to Doofinder's search API. The API responds with the items to display in the Search Layer, ranked according to certain criteria.</p>
                  <p>The Store's backend isn't part of that WebSocket connection at all — it's simply where the script that the Search Layer loads actually lives.</p>
                  <p>This module won't go into the mechanics of that connection, or the technology behind the search API itself — built on <strong>OpenSearch</strong> — but it's worth briefly touching on the different types of calls it can launch, since understanding them matters for figuring out why certain products show up for a query and others don't.</p>
                </div>
              </div>

              <p>Beyond the search technology Doofinder uses, the quality of the results it returns depends mainly on two things:</p>
              <ul>
                <li>The content and structure of the <strong>data feed</strong> indexed in the Search Engine — if an item isn't indexed at all, it simply can't be found through search. Likewise, if an item's entry is missing a specific piece of information, it can't be found by searching for that particular detail.</li>
                <li>The Search Engine's own configuration — every Search Engine is set up around a handful of features:
                  <ul>
                    <li><strong>Search Fields</strong> — decides which parts of a product's data get searched, and how much weight each one carries.</li>
                    <li><strong>Relevance Criteria</strong> — decides the order results are displayed in, breaking ties beyond the base Score.</li>
                    <li><strong>Boosting</strong> — changes a product's relevance in the results, based on configuration or shopper behavior.</li>
                    <li><strong>Custom Results</strong> — includes or excludes specific items from the results of particular search terms.</li>
                    <li><strong>Excluded Results</strong> — intentionally removes specific items from a Search Engine's results altogether.</li>
                    <li><strong>Synonyms</strong> — lets a search for one term also match others that mean the same thing, even if the feed itself never uses those other words.</li>
                  </ul>
                  Excluded Results and Synonyms are covered in more detail later in the course.
                </li>
              </ul>`
          }
        ]
      },
      quiz: [
        {
          q: "According to this lesson, what is the <strong>Search Layer</strong>?",
          options: [
            "A server-side script that runs on Doofinder's infrastructure",
            "The client-side widget running in the user's browser",
            "A database table inside the Search Engine",
            "A configuration screen in the Admin Panel"
          ],
          correct: 1,
          explain: "The Search Layer is described as the client-side widget running in the user's browser."
        },
        {
          q: "Once that connection is active, what happens every time a shopper types something?",
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
          q: "What does the Search Layer open when a shopper clicks the site's search box?",
          options: [
            "A new browser tab",
            "A connection to the site's own database",
            "A download of the installation script",
            "A WebSocket connection directly to Doofinder's servers, pointing to the Search Engine of the web"
          ],
          correct: 3,
          explain: "Clicking the search box activates the Search Layer — the client-side widget running in the user's browser — which opens a WebSocket connection directly to Doofinder's servers, pointing to the Search Engine of the web."
        },
        {
          q: "What does the search API respond with?",
          options: [
            "A list of Authorized Domains",
            "The products to display in the Search Layer, ranked according to certain criteria",
            "The installation script",
            "A new data feed"
          ],
          correct: 1,
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
          q: "A product isn't listed anywhere in the data feed. What happens when a shopper searches for it?",
          options: [
            "It's found automatically through a Custom Result",
            "It's found only using Boosting",
            "It's found through Relevance Criteria",
            "It can't be found, since the Search Engine can't search a product that isn't in the feed"
          ],
          correct: 3,
          explain: "If a product isn't in the data feed at all, it simply can't be found through search."
        },
        {
          q: "Besides the data feed's content and structure, what else shapes the quality of search results?",
          options: [
            "The Store's billing plan",
            "The Search Engine's own configuration — Search Fields, Relevance Criteria, Boosting, Custom Results, Excluded Results and Synonyms",
            "The number of Authorized Domains",
            "The site's hosting provider"
          ],
          correct: 1,
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
      theory: {
        lead: "<strong>Results Preview</strong> is the section where Doofinder's response to a query can be tested — typing in a search term and seeing exactly what the Search Layer would return for it.",
        blocks: [
          {
            html: `
              <p>Just below the search bar, it's possible to see the number of results for that query, the type of query that was launched, and whether certain configuration features are being applied — such as Custom Results or Relevance Criteria.</p>
              <p>Below that, the list of products for that query appears, in the order they'd show up in the Search Layer. Next to each product sits its <strong>Score</strong>: the total value of a product, which determines how close the result is to the search query — the more relevant the product, the higher the score. Score is the multiplication of <strong>Relevance</strong> (the original score of each product for the search query, before any boosting factor is applied) and <strong>Boosting</strong> (the total boosting value after every boosting factor has been applied — the feature that multiplies the original Relevance score).</p>
              <p>For each product in the list, clicking its "+" button shows every piece of information loaded for it, field by field, according to the uploaded data feed and the mapping applied — making it easy to see what information a product actually has loaded, without needing to check the data feed directly.</p>

              <p>Also, it's possible to see which <strong>query type</strong> has been launched, which indicates whether the results shown are an exact match for the search performed, an approximate one, or no match at all. There are four possible query types: <code>match_and</code>, <code>match_or</code>, <code>fuzzy</code>, and <code>match_all</code>.</p>
              <ul>
                <li><code>match_and</code> — a perfect correspondence between the search terms and the indexed ones; used for both single-term queries (e.g. "Nike" returning exact matches like "Nike shoes") and multi-term ones, where every term needs to be present (e.g. "red t-shirt" returning results containing both words).</li>
                <li><code>match_or</code> — a broader match, returning content that contains at least one of the terms in a multi-term query; for "red t-shirts", that could mean "red" and "t-shirts" matching separately rather than together.</li>
                <li><code>fuzzy</code> — no exact match between what was searched and what's indexed, typically due to a typo, e.g. searching "tsirt" instead of "t-shirt".</li>
                <li><code>match_all</code> — the entire catalogue, shown before any term is typed, or when Custom Results are configured for that specific search.</li>
              </ul>
              <p>So, when a search is performed with one or more terms, Doofinder first looks for products that contain all of the search terms — if that returns something, it's a <code>match_and</code>, returning only the products with those terms. If there's no <code>match_and</code>, it falls back to <code>match_or</code>; and if there's no <code>match_or</code> either, it falls back to <code>fuzzy</code>, using that same logic for returning products.</p>

              <figure class="lesson-figure lesson-figure-left">
                <img src="img/results-preview-example.png" alt="Results Preview panel for the query 'shoe', showing 159 results with query type match_and, a Synonym indicator, and the first product expanded to reveal all of its loaded fields" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>Here's what this looks like in practice, for the query "shoe":</p>
              <ul>
                <li>Just under the search bar, <strong>Results: 159</strong> and <strong>Query type: match_and</strong> confirm how many products matched and which query type produced them, with a shortcut to Relevance Criteria right next to it.</li>
                <li>A <strong>Synonym</strong> indicator ("shoe, boot") shows up too, meaning the search term was expanded through a configured synonym.</li>
                <li>Each row lists a product with its Relevance, Boosting and Total — for the first item, <strong>DR MARTENS | 1461 DMC 3-EYE SHOE | BLACK SMOOTH</strong>, Relevance is 3.76 and Boosting is 1.5, giving a Total of 5.64.</li>
                <li>That first item is expanded, revealing every field loaded for it — price, brand, categories, description, image link and more — exactly as clicking its "+" button would show.</li>
              </ul>`
          }
        ]
      },
      quiz: [
        {
          q: "What is Results Preview used for?",
          options: [
            "Testing <strong>Doofinder</strong>'s response to a query and seeing exactly what the Search Layer would return",
            "Uploading a new data feed",
            "Setting the Store's currency",
            "Creating a new Search Engine"
          ],
          correct: 0,
          explain: "Results Preview lets a search term be typed in to see exactly what the Search Layer would return for it."
        },
        {
          q: "What can be seen just below the search bar in Results Preview?",
          options: [
            "The number of results, the query type, and whether certain configuration features are being applied",
            "The Store's billing plan",
            "The installation script",
            "The list of Authorized Domains"
          ],
          correct: 0,
          explain: "Just below the search bar, the number of results, the query type, and whether certain configuration features are applied can all be seen."
        },
        {
          q: "What does a product's Score represent?",
          options: [
            "Its total value, determining how close the result is to the search query",
            "Its price before tax",
            "Its stock level",
            "Its position in the data feed"
          ],
          correct: 0,
          explain: "Score is the total value of a product — the more relevant the product is to the search query, the higher the score."
        },
        {
          q: "What does Relevance show?",
          options: [
            "The original score of a product for the search query, before any boosting factor is applied",
            "The final score after boosting",
            "The product's stock level",
            "The product's price"
          ],
          correct: 0,
          explain: "Relevance shows the original score of each product according to the search query, before applying any boosting factor."
        },
        {
          q: "What does Boosting display, and what does it do to the score?",
          options: [
            "The total boosting value after every boosting factor has been applied — it multiplies the original Relevance score",
            "The product's price after a discount",
            "The number of Authorized Domains",
            "The Store's currency"
          ],
          correct: 0,
          explain: "Boosting displays the total boosting value after applying any boosting factor, and is the feature that multiplies the original score (Relevance)."
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
            "Every piece of information loaded for that product, field by field, according to the feed and mapping applied",
            "The product's price history",
            "A list of similar products",
            "The Search Engine's Hash ID"
          ],
          correct: 0,
          explain: "The \"+\" button shows all the information loaded for a product, field by field, making it easy to check without going through the data feed directly."
        },
        {
          q: "If a query returns no <code>match_and</code> and no <code>match_or</code>, what does it fall back to?",
          options: ["Fuzzy", "Match_all", "It returns no results at all", "It retries match_and"],
          correct: 0,
          explain: "The fallback order is match_and, then match_or, and finally fuzzy, all using the same logic for returning products."
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
        lead: "With <strong>Doofinder</strong> you can configure and choose which fields — loaded through the data feed — your Search Engine should take into account when searching for products, and how important each one is relative to the rest.",
        blocks: [
          {
            html: `
              <figure class="lesson-figure lesson-figure-right">
                <img src="img/search-fields-advanced-preferences.png" alt="Advanced Preferences > Search Fields screen, with a warning about the impact of changes, a Field/Weight selector to add a new field, and a configured list showing brand, categories, description, df_all, gtin, mpn, title and title.autocomplete with their weights" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>Each field that's selected can be assigned a weight of its own.</p>
              <p>An important factor influencing which terms surface in the results is that the larger a field's content is in the index, the more irrelevant the terms inside it become. In other words, if a keyword sits inside the <strong>description</strong>, for instance, it will be less relevant than if it sits inside a shorter field.</p>
              <p>By default, the configuration includes a field called <code>df_all</code>. This isn't a field that comes from the data feed itself — it's a field Doofinder creates automatically, which makes the Search Engine take into account every field loaded from the feed.</p>
              <p>By default, weight doesn't apply to every field, only to the ones that have been selected (weight ranges from 1 to 10). By default, the <strong>title</strong> carries a higher weight than the rest of the fields.</p>
              <p>So, when a search is performed for a given term, among the products that have that term indexed in some field, a product with the term in its title will score higher than a product that only has it in another field.</p>
              <p>If <code>df_all</code> is removed, the Search Engine will only search within the fields that have been explicitly selected.</p>

              <p>On top of a feed's own fields, there are other fields that already exist (or can be created) which don't belong to the data feed but can still be added to the Search Fields configuration:</p>
              <ul>
                <li><code>brand.autocomplete</code> — designed to search based on parts of the brand name.</li>
                <li><code>id.light_explode</code> — improves relevance for searches using the <code>id</code> field.</li>
                <li><code>df_all</code> — folds in the content of every field in the feed, so searches also reach fields that weren't expressly selected; since it's so broad, it should be given a low weight.</li>
                <li><code>gtin.light_explode</code> and <code>mpn.light_explode</code> — let a search use parts of a product's reference number.</li>
                <li><code>title.autocomplete</code> — for searching based on parts of the title.</li>
                <li><code>title.autocomplete_start</code> — boosts relevance for single-term searches whenever the title starts with that same word.</li>
              </ul>
              <p>The exact fields on offer can vary between sites and platforms.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What can be configured in Search Fields?",
          options: [
            "Which fields, loaded through the data feed, the Search Engine should take into account when searching for products, and how important each is relative to the rest",
            "The Store's billing plan",
            "Which Search Engine is currently active",
            "The layout of the Search Layer"
          ],
          correct: 0,
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
            "A field automatically created by <strong>Doofinder</strong> that makes the Search Engine take into account every field loaded from the feed",
            "A field that must be added manually to the data feed",
            "A setting that disables every other Search Field",
            "A fixed weight reserved for the title"
          ],
          correct: 0,
          explain: "<code>df_all</code> isn't a field coming from the data feed — <strong>Doofinder</strong> creates it automatically so the Search Engine takes into account every field that's been loaded."
        },
        {
          q: "By default, which fields does weight apply to, and on what scale?",
          options: [
            "Only the fields that have been selected, on a scale from 1 to 10",
            "Every field loaded from the feed, automatically",
            "Only <code>df_all</code>",
            "None, unless enabled first in Relevance Criteria"
          ],
          correct: 0,
          explain: "By default weight only applies to the fields that have been selected, not to every field, and it ranges from 1 to 10."
        },
        {
          q: "A search term appears in one product's title and, for another product, only in its description. What happens to their scores?",
          options: [
            "The product with the term in its title scores higher",
            "Both products get exactly the same score",
            "The product with the term in its description scores higher",
            "Neither product appears in the results"
          ],
          correct: 0,
          explain: "By default the title carries a higher weight than the rest of the fields, so a product with the term in its title scores higher than one that only has it in another field."
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
            "gtin.light_explode and mpn.light_explode",
            "brand.autocomplete and title.autocomplete",
            "df_all and id.light_explode",
            "title.autocomplete_start and df_all"
          ],
          correct: 0,
          explain: "gtin.light_explode and mpn.light_explode let a search use parts of a product's reference number."
        },
        {
          q: "Are the exact field types on offer the same across every site and platform?",
          options: [
            "No — the exact fields on offer can vary between sites and platforms",
            "Yes, they're always identical everywhere",
            "Only <code>df_all</code> varies; the rest are fixed",
            "They vary by language, but not by platform"
          ],
          correct: 0,
          explain: "The exact fields on offer can vary between sites and platforms."
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
              <p>More than one criterion can be used at once, and each one can be configured as <strong>ascending</strong> or <strong>descending</strong> — how that works depends on the type of criterion.</p>
              <p>If a criterion is represented by numeric values, the order follows that number: configured as descending, items are sorted from the highest value of that criterion down to the lowest; configured as ascending, from the lowest up to the highest. If the criterion uses text values instead, the order follows the alphabet — A→Z or Z→A.</p>
              <p>By default, there's only one criterion: <strong>Score</strong>, configured as descending. So the more score an item has, the higher up it's displayed in the list.</p>
              <p>Up to five criteria can be added. The extra ones are fields indexed from the feed — for example, <code>price</code>, <code>title</code> or <code>categories</code> — as long as they aren't <strong>Keyword</strong>-type fields, such as <code>id</code> (field types will be covered further ahead).</p>
              <p>The order in which the criteria are listed affects how results end up arranged.</p>

              <figure class="lesson-figure lesson-figure-right">
                <img src="img/relevance-criteria-score-price.png" alt="Relevance Criteria screen with Score listed first (Highest to lowest) and best_price listed second (Highest to lowest)" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>With a Relevance Criteria configuration like this one — <strong>Score</strong> (Highest to lowest) listed first, then <strong>best_price</strong> (Highest to lowest) — products are sorted from the highest score to the lowest, and products that share the same score are then sorted by price, from highest to lowest.</p>
              <figure class="lesson-figure lesson-figure-left" style="clear: both;">
                <img src="img/relevance-criteria-price-score.png" alt="Relevance Criteria screen with best_price listed first (Highest to lowest) and Score listed second (Highest to lowest)" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p>With the criteria in the opposite order instead — <strong>best_price</strong> (Highest to lowest) first, then <strong>Score</strong> (Highest to lowest) — items are sorted from the highest price to the lowest, and products that share the same price are then sorted by score, from highest to lowest.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What does Relevance Criteria decide?",
          options: [
            "Which criteria are used to sort the results a query displays",
            "Which fields get indexed from the data feed",
            "Which fields the search engine looks at when matching a query",
            "How many results a query returns"
          ],
          correct: 0,
          explain: "Relevance Criteria decides which criteria are used to sort the results displayed for a query."
        },
        {
          q: "Can more than one criterion be used at the same time, and how is each one configured?",
          options: [
            "Yes — more than one can be used, and each is configured independently as ascending or descending",
            "No, only one criterion can ever be active",
            "Yes, but all of them must share the same ascending/descending setting",
            "Yes, but a maximum of two at a time"
          ],
          correct: 0,
          explain: "More than one criterion can be used at once, and each one can be configured on its own as ascending or descending."
        },
        {
          q: "For a criterion represented by numeric values and configured as descending, how are items ordered?",
          options: [
            "From the highest value of that criterion down to the lowest",
            "From the lowest value of that criterion up to the highest",
            "Alphabetically, A to Z",
            "Randomly among tied values"
          ],
          correct: 0,
          explain: "For a numeric criterion, descending order sorts items from the highest value of that criterion down to the lowest."
        },
        {
          q: "How is a criterion that uses text values ordered?",
          options: [
            "A→Z (ascending) or Z→A (descending)",
            "Always from shortest text to longest",
            "By numeric value only",
            "It can't be used as a sorting criterion"
          ],
          correct: 0,
          explain: "Criteria with text values are ordered following the alphabet — A→Z or Z→A."
        },
        {
          q: "By default, what single criterion does Relevance Criteria use, and how is it configured?",
          options: [
            "Score, descending",
            "Price, ascending",
            "Title, A→Z",
            "Categories, descending"
          ],
          correct: 0,
          explain: "By default there's only one criterion, Score, configured as descending — so the more score an item has, the higher up it's displayed."
        },
        {
          q: "At most how many criteria can be added, and what can the extra ones be?",
          options: [
            "Up to five, using fields indexed from the feed, such as price, title or categories",
            "Up to five, using text fields only",
            "Up to three, using any field at all",
            "Unlimited, as long as they're numeric"
          ],
          correct: 0,
          explain: "Up to five criteria can be added, and the extra ones are fields indexed from the feed, like price, title or categories."
        },
        {
          q: "Can a Keyword-type field, such as <code>id</code>, be added as an extra Relevance Criteria field?",
          options: [
            "No — extra criteria can't be Keyword-type fields, such as id",
            "Yes, id is the recommended second criterion",
            "Yes, but only after removing Score",
            "There's no restriction on which fields can be added"
          ],
          correct: 0,
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
              <p>By default, if no search query is being made, a <code>match_all</code> query is launched, rendering all the indexed items in the results (unless some of them are being excluded — but that's covered later in the course).</p>
              <p>The score of all the items is <strong>1</strong>, and if Relevance Criteria is set to only Score, the order of appearance is given solely by the indexation order, as we saw in one of the previous lessons.</p>
              <p>But if we put a boosting (a multiplier) on the "natural" score of a given product, that product's natural position will change. If we apply a positive boosting (for example, <strong>1.5</strong>), that product will appear in first position. If we apply a negative boosting, it will appear in last position.</p>
              <p>It's a multiplier applied regardless of the query launched. This also means that if, for a given search, that same product doesn't appear in the results list — having a score of <strong>0</strong> — that multiplier won't have any influence on the final score. That is, it can't make the product appear if it isn't in the natural list of products for a given query. This also means that if a product has a low score for a given query, even if a boosting is applied, it's not guaranteed that product will appear in first position.</p>
              <p>If a very high boosting is given to a given product, you risk putting it in first position in every search where it appears, even if naturally it wouldn't be relevant in some of them.</p>
              <p>You can also give a negative boosting, using a number between <strong>0.1</strong> and <strong>0.9</strong> (using a boosting of <strong>0</strong> removes it from every type of search).</p>

              <p>There are four ways to apply it:</p>
              <figure class="lesson-figure lesson-figure-right" style="width: 260px;">
                <img src="img/boosting-rules-edit-example.png" alt="Edit Boosting Rule panel named 'Expensive Shoes' with a Boost value of 1.5, Search Terms disabled, and conditions requiring all results to match categories Is Shoes and best_price Not in range 0.0–100.0" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <ul>
                <li><strong>Manual Boosting</strong> — the possibility of applying a boosting to a single product, as seen previously.</li>
                <li><strong>Boosting Rules</strong> — the possibility of applying a boosting to every product that matches given conditions. The conditions are related to the indexed fields, several conditions can be applied at once, and the boosting can be set to apply to products that meet all of those conditions or at least one of them.</li>
                <li><strong>Automatic Boosting</strong> — an option that, when active, automatically adds boost to products that, over the last 15 days, have been clicked and viewed more than the average of all products.</li>
                <li><strong>Boosting Through Data Feed</strong> — by indexing the <code>df_manual_boost</code> field, a manual boosting can be applied to products directly through indexation, and it overwrites whatever manual boost was set in the Admin Panel.</li>
              </ul>
              <p>Here's what a Boosting Rule looks like once configured: this one, named <strong>Expensive Shoes</strong>, applies a <strong>1.5</strong> boost to every product that has "shoes" indexed as its category and a best price of 100 or more.</p>
              <p>These four ways apply simultaneously to the final score. Combining a manual boosting of <strong>1.5</strong> with a Boosting Rules value of another <strong>1.5</strong> takes a product's initial score of <strong>1</strong> up to <strong>2.25</strong>: 1 × 1.5 × 1.5 = 2.25.</p>
              <figure class="lesson-figure lesson-figure-left">
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
            "It multiplies the score, pushing the product up or down the results",
            "It only affects the product's price",
            "It only applies to out-of-stock products"
          ],
          correct: 1,
          explain: "A boosting factor multiplies a result's existing score, moving that product further up or down the list."
        },
        {
          q: "In Manual Boosting, what does a value below 1.0 (but above 0) do to a product?",
          options: ["Raises its ranking", "Lowers its ranking", "Removes it from results entirely", "Has no effect"],
          correct: 1,
          explain: "In Manual Boosting, values above 1.0 raise a product's ranking, while values below 1.0 (but above 0) lower it."
        },
        {
          q: "What does Automatic Boosting reward?",
          options: [
            "Products added most recently to the feed",
            "Products that have been performing well recently, based on a balance of visits and clicks",
            "Products with the lowest price",
            "Products with the most fields filled in"
          ],
          correct: 1,
          explain: "Automatic Boosting rewards products that have been performing well recently, using a recent (last 15 days) balance of visits and clicks, and only applies to above-average performers."
        },
        {
          q: "What's the valid range for the <code>df_manual_boost</code> field?",
          options: ["0 to 100", "0.1 to 19.99", "1 to 10", "-1 to 1"],
          correct: 1,
          explain: "<code>df_manual_boost</code> accepts values from 0.1 to 19.99 — 0, negative numbers, or 20 and above trigger an indexing error."
        },
        {
          q: "If <code>df_manual_boost</code> is set in the feed and a manual boost was also set in the Admin Panel, what happens?",
          options: [
            "Both are averaged together",
            "The feed value overwrites the Admin Panel value",
            "The Admin Panel value always wins",
            "<strong>Doofinder</strong> throws an error and ignores both"
          ],
          correct: 1,
          explain: "<code>df_manual_boost</code>, coming from the feed (or API), overwrites whatever manual boost value was set through the Admin Panel."
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
              <p>The query can be configured in two ways:</p>
              <ul>
                <li><strong>Exact Match</strong> — this Custom Result will be displayed only if the user types the exact search term or terms chain.</li>
                <li><strong>Broad Match</strong> — this Custom Result will be displayed if the text typed by the user contains the set search term.</li>
              </ul>
              <p>The way of including or excluding items from queries through Custom Results is similar to what we saw in Boosting Rules. That is, it can be applied at the level of individual products, or at the level of a group of products that meet given conditions — dictated by the indexed fields and their values, exactly as in Boosting Rules.</p>
              <p>Within a rule, conditions can be combined:</p>
              <ul>
                <li>An <strong>AND</strong> condition happens automatically as soon as two filters with different attributes are used together — e.g. category "Shoes" and color "blue" only matches items that are both.</li>
                <li>An <strong>OR</strong> condition happens by adding two or more values in the same row — e.g. color "blue" or "red" in the same rule matches items with either one.</li>
                <li>Both can be combined at once: category "Shoes" whose color is "blue" or "red" mixes an AND (category + color) with an OR (blue vs red) in the same rule.</li>
              </ul>
              <p>"And" logic can't be applied twice to the same field within one rule — though a field can still hold more than one value.</p>
              <p>Within the same Custom Result, several rules can be applied (individual items or rules), and the arrangement of products depends on the disposition of these rules.</p>
              <p>In Custom Results you can decide between <strong>Display only the selected results</strong> or <strong>Display the selected results first, then natural results</strong>.</p>
              <p>Custom Results can be applied for a specific period, or it can always be active.</p>`
          },
          {
            heading: "Combining Relevance Criteria, Boosting and Custom Results",
            pageBreak: true,
            html: `
              <p>These three features can be active at the same time. For a given search, the products may be sorted according to Relevance Criteria, a Custom Result may be forcing certain items into (or out of) that list, and some of those items may also carry a boost. Since they overlap, it's worth being precise about how they interact — and which one has the final word.</p>
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
            "To automatically reorder every result by price",
            "To include or exclude specific items from search results for particular terms",
            "To translate product titles",
            "To generate the installation script"
          ],
          correct: 1,
          explain: "Custom Results let specific items be included in or excluded from the results shown for particular search terms."
        },
        {
          q: "What does the Status toggle let you do?",
          options: [
            "Permanently delete a Custom Result",
            "Enable or disable a Custom Result without deleting it",
            "Change its Search Terms",
            "Merge it with another Custom Result"
          ],
          correct: 1,
          explain: "Status enables or disables a Custom Result without deleting it, so it can be paused and reactivated later."
        },
        {
          q: "What's the difference between Included Items and Excluded Items?",
          options: [
            "They're the same list, shown twice",
            "Included Items adds specific products to the results; Excluded Items removes them",
            "Included Items only works with rules, Excluded Items only with individual products",
            "Excluded Items only applies to out-of-stock products"
          ],
          correct: 1,
          explain: "Included Items and Excluded Items share the same structure — added individually or via rules — but one adds products to a Custom Result's results and the other removes them."
        },
        {
          q: "A rule requires category = shoes AND brand = Nike. Which condition logic is this?",
          options: ["Or", "And", "Broad Match", "Exact Match"],
          correct: 1,
          explain: "And conditions require every filter to be satisfied at once — here, both category = shoes and brand = Nike."
        },
        {
          q: "Where do Custom Results integrate with the Search Layer's initial view?",
          options: [
            "Layer Settings > Search Sequence > Query for recommended products",
            "Managing Data > Field Name Mapping",
            "Search > Relevance Criteria",
            "Store > Authorized Domains"
          ],
          correct: 0,
          explain: "Custom Results can populate the 'Query for recommended products' field under Layer Settings > Search Sequence, showing preferred products when the layer opens."
        },
        {
          q: "What can cause a product to show as 'not indexed' inside a Custom Result?",
          options: [
            "Being out of stock, already excluded elsewhere, a changed product ID, or not being an indexed product at all",
            "Having too high a boosting value",
            "Being part of Relevance Criteria",
            "Using a wildcard domain"
          ],
          correct: 0,
          explain: "Products can show as 'not indexed' for several reasons: out-of-stock status, prior exclusion, a changed ID, or simply not being indexed at all."
        },
        {
          q: "How many Custom Results can a Store have at most?",
          options: ["10", "50", "100", "Unlimited"],
          correct: 2,
          explain: "A Store can have up to 100 Custom Results."
        },
        {
          q: "When copying a Custom Results configuration to another Search Engine, what does 'Copy and Replace Existing Settings' do?",
          options: [
            "Adds the copied results on top of the existing ones",
            "Overwrites the destination's existing results, and can't be undone",
            "Only copies the Name field",
            "Requires a support ticket"
          ],
          correct: 1,
          explain: "'Copy and Replace Existing Settings' overwrites the destination Search Engine's existing Custom Results, and that action is irreversible."
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
        lead: `You open the <strong>Admin Panel</strong> and start working through John's WhatsApp message, one issue at a time.</p>
          <ul>
            <li>Figure out why <strong>out-of-stock</strong> products sometimes rank in the first positions.</li>
            <li>Figure out why searching "comfortable nike" surfaces the <strong>NIKE | SWOOSH PRO FLAT PEAK CAP</strong> before any actual Nike shoe.</li>
            <li>Figure out why searching "Baseball Hat" also returns shoes or socks.</li>
            <li>Make sure products with an active <strong>discount</strong> get more visibility across the whole store, not just on specific searches.</li>
          </ul>`,
        doneNote: "All four issues John raised are fixed — Doostride's search now puts in-stock, on-brand and discounted products where they belong.",
        replyButtonLabel: "Reply to John",
        phases: [
          {
            key: "problem-features",
            title: "1. Picking the right feature for each problem",
            question: "Before touching any configuration, you go back over John's four complaints and work out which <strong>Doofinder</strong> feature is the right tool for each one.</p><ul style=\"margin:0 0 16px; padding-left:20px;\"><li style=\"margin-bottom:14px;\"><strong>Problem 1:</strong> On some searches, out-of-stock products showed up before ones that were actually in stock, and even among in-stock products, pricier items tended to rank above cheaper ones. You need a feature that lets in-stock products always show up before out-of-stock ones — no matter the search term — while also sorting by price from cheapest to most expensive, but only as a tiebreak: a cheaper, less relevant product still shouldn't outrank a pricier one that's more relevant.</li><li style=\"margin-bottom:14px;\"><strong>Problem 2:</strong> The store's main products are shoes, ideally from Nike or Adidas — but there was no way to make shoes from these brands more important than the rest. You need a feature that gives extra relevance to products with these characteristics, while still letting other products outrank them whenever a specific search makes them more relevant.</li><li style=\"margin-bottom:14px;\"><strong>Problem 3:</strong> Looking at the old engine's stats, you found plenty of searches like \"shoes on sale\" and \"shoes discounted\" — but their results weren't limited to Doostride's actually discounted shoes. You need a feature that lets you force what shows up for these specific searches, if needed even by picking the products by hand.</li><li><strong>Problem 4:</strong> Every product has a reference code made of 4 blocks — category, brand, color and size. For example, <code>SHODRMBLA005</code> means Shoes (<code>SHO</code>), Dr Martens (<code>DRM</code>), black (<code>BLA</code>), size 5 (<code>005</code>). You want the team to be able to search by just part of that code: typing <code>SHOCON</code> should find every Shoes product from Converse, and <code>SHODRMRED</code> every red Shoes product from Dr Martens — without anyone needing to type the complete code. You need a feature that makes this possible.</li></ul><p class=\"theory-lead\" style=\"margin-bottom:16px;\">For each problem below, choose the feature that should be used to solve it:",
            fields: [
              { key: "problem1", label: "Problem 1", type: "select", options: ["Relevance Criteria", "Boosting", "Custom Results", "Search Fields"], correct: "Relevance Criteria" },
              { key: "problem2", label: "Problem 2", type: "select", options: ["Boosting", "Relevance Criteria", "Custom Results", "Search Fields"], correct: "Boosting" },
              { key: "problem3", label: "Problem 3", type: "select", options: ["Custom Results", "Relevance Criteria", "Boosting", "Search Fields"], correct: "Custom Results" },
              { key: "problem4", label: "Problem 4", type: "select", options: ["Search Fields", "Relevance Criteria", "Boosting", "Custom Results"], correct: "Search Fields" }
            ],
            explain: "<strong>Relevance Criteria</strong> fixes the first problem: it lets you stack extra sorting factors — like Availability and Price — on top of Score, each one only stepping in to break a tie left by the one before it. <strong>Boosting</strong> fixes the second: it can raise a product's relevance based on its own fields, like brand = Nike or Adidas, no matter what was searched — while other, more relevant products for a specific query can still outrank it. <strong>Custom Results</strong> fixes the third: it lets you force a specific set of results for specific searches, whether by hand-picking products or through a rule that decides automatically. <strong>Search Fields</strong> fixes the fourth: it controls which fields are searched and how, including whether a field like a product code can be matched partially instead of only as an exact, complete value. In the next steps, you'll work out how to configure each of these."
          },
          {
            key: "relevance-criteria-fields",
            title: "2. Which fields to add, and how to sort each one",
            question: "Before working out the priority order, you first need to decide which fields belong in Relevance Criteria.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">For each field below, choose its Order value — or \"Not used\" if it shouldn't be part of Relevance Criteria at all:",
            fields: [
              { key: "f_score", label: "Score", type: "select", options: ["Not used", "Highest to lowest", "Lowest to highest"], correct: "Highest to lowest" },
              { key: "f_availability", label: "availability", type: "select", options: ["Not used", "A to Z", "Z to A"], correct: "A to Z" },
              { key: "f_best_price", label: "best_price", type: "select", options: ["Not used", "Lowest to highest", "Highest to lowest"], correct: "Lowest to highest" },
              { key: "f_brand", label: "brand", type: "select", options: ["Not used", "A to Z", "Z to A"], correct: "Not used" },
              { key: "f_category", label: "category", type: "select", options: ["Not used", "A to Z", "Z to A"], correct: "Not used" },
              { key: "f_stock_quantity", label: "stock_quantity", type: "select", options: ["Not used", "Highest to lowest", "Lowest to highest"], correct: "Not used" },
              { key: "f_title", label: "title", type: "select", options: ["Not used", "A to Z", "Z to A"], correct: "Not used" }
            ],
            explain: "You need exactly three fields in Relevance Criteria: the default <strong>Score</strong> sorted <strong>Highest to lowest</strong> (most relevant first), <strong>availability</strong> sorted <strong>A to Z</strong> (so \"in stock\" sorts before \"out of stock\"), and <strong>best_price</strong> sorted <strong>Lowest to highest</strong> (cheapest first). brand, category, stock_quantity and title don't solve either problem John raised, so they stay unused. Their priority order — which one goes first, second and third — is what you'll work out in the next step."
          },
          {
            key: "relevance-criteria-config",
            title: "3. Configuring Relevance Criteria",
            question: "You want in-stock products to always show up first — no matter how relevant they are to the search term — and, whenever two products tie on that, the cheapest one should come first.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze these 4 images, each showing a different Relevance Criteria configuration, and choose the one that gets you what you want:",
            fields: [
              { key: "correctconfig", type: "image-select", layout: "column", thumbCols: 2, options: [
                { value: "a", src: "img/relevance-criteria-final-a.png", alt: "Relevance Criteria with availability (A to Z) first, Score (Highest to lowest) second, best_price (Lowest to highest) third", caption: "Option A" },
                { value: "b", src: "img/relevance-criteria-final-b.png", alt: "Relevance Criteria with best_price (Lowest to highest) first, Score (Highest to lowest) second, availability (A to Z) third", caption: "Option B" },
                { value: "c", src: "img/relevance-criteria-final-c.png", alt: "Relevance Criteria with Score (Highest to lowest) first, availability (A to Z) second, best_price (Lowest to highest) third", caption: "Option C" },
                { value: "d", src: "img/relevance-criteria-final-d.png", alt: "Relevance Criteria with availability (A to Z) first, best_price (Lowest to highest) second, Score (Highest to lowest) third", caption: "Option D" }
              ], correct: "a" }
            ],
            explain: "Option A is correct: with availability listed first (A to Z, so \"in stock\" sorts before \"out of stock\"), in-stock products always come first regardless of relevance — Score only breaks ties between products with the same availability, and best_price only breaks ties left after that. Options B and C put Score or best_price ahead of availability, so out-of-stock products could still outrank in-stock ones whenever they score higher or cost less. Option D puts best_price before Score, so among in-stock products the cheapest one wins the tie instead of the most relevant one — the wrong tiebreak order."
          },
          {
            key: "boosting-fields",
            title: "4. \"comfort\" surfaces the wrong products",
            question: "You type \"comfort\" into the <strong>Results Preview</strong>. The very first result is the <strong>NIKE | SWOOSH PRO FLAT PEAK CAP</strong>, and further down several products from brands other than Nike or Adidas outrank Doostride's actual Nike and Adidas shoes.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">You decide to set up a <strong>Boosting Rule</strong> so Nike and Adidas shoes always get more relevance, no matter what's searched.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">For each field below, choose the value the Boosting Rule should boost — or \"Not used\" if that field shouldn't be part of this rule at all:",
            fields: [
              { key: "f_category", label: "category", type: "select", options: ["Not used", "Shoes", "Apparel", "Accessories"], correct: "Shoes" },
              { key: "f_brand", label: "brand", type: "select", options: ["Not used", "Nike", "Adidas", "Nike or Adidas", "Puma"], correct: "Nike or Adidas" },
              { key: "f_price", label: "price", type: "select", options: ["Not used", "Under 50", "Over 100"], correct: "Not used" },
              { key: "f_availability", label: "availability", type: "select", options: ["Not used", "In stock", "Out of stock"], correct: "Not used" },
              { key: "f_title", label: "title", type: "select", options: ["Not used", "Contains \"comfort\"", "Contains \"nike\""], correct: "Not used" },
              { key: "f_description", label: "description", type: "select", options: ["Not used", "Contains \"comfort\"", "Contains \"nike\""], correct: "Not used" },
              { key: "f_color", label: "color", type: "select", options: ["Not used", "Black", "White"], correct: "Not used" }
            ],
            explain: "Two conditions get you what you want: <strong>category</strong> = <strong>Shoes</strong> and <strong>brand</strong> = <strong>Nike or Adidas</strong>. That's exactly Doostride's main products — Nike and Adidas shoes — no matter what's searched. price, availability, title, description and color don't identify \"our main products\" the way category and brand do, so they stay unused. Basing the rule on the product's own fields, rather than on a specific Search Term, is also why it keeps working for \"comfort\" as well as for any other query. In the next step, you'll work out exactly how to set these two conditions up."
          },
          {
            key: "boosting-config",
            title: "5. Configuring the Boosting Rule",
            question: "You now need to actually build the <strong>Boosting Rule(s)</strong> around <strong>category</strong> = <strong>Shoes</strong> and <strong>brand</strong> = <strong>Nike or Adidas</strong>.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze these 3 images, each showing a different Boosting configuration, and choose the one that gets you what you want:",
            fields: [
              { key: "correctconfig", type: "image-select", layout: "column", thumbCols: 2, thumbAspect: "2.45", options: [
                { value: "a", src: "img/boosting-final-a.png", alt: "Two separate Global Boosting Rules: SHOES with condition categories is Shoes and boost 2.0, and NIKE / ADIDAS with condition brand is ADIDAS, NIKE and boost 1.5, both enabled", caption: "Option A" },
                { value: "b", src: "img/boosting-final-b.png", alt: "Two separate Global Boosting Rules: SHOES with condition categories is Shoes and boost 2.0, and NIKE / ADIDAS with condition brand is ADIDAS AND brand is NIKE and boost 1.5, both enabled", caption: "Option B" },
                { value: "c", src: "img/boosting-final-c.png", alt: "A single Global Boosting Rule, SHOES NIKE / ADIDAS, with condition categories is Shoes AND brand is ADIDAS, NIKE and boost 2.0, enabled", caption: "Option C" }
              ], correct: "a" }
            ],
            explain: "Option A is correct: two separate Global rules — <strong>SHOES</strong> (categories is Shoes, boost 2.0) and <strong>NIKE / ADIDAS</strong> (brand is ADIDAS, NIKE — meaning either one, boost 1.5) — stack multiplicatively. Any shoe gets the 2.0 boost, any Nike or Adidas product gets the 1.5 boost, and a Nike or Adidas shoe gets both at once, ranking it above a shoe from another brand or a Nike/Adidas accessory like the cap. Option B uses <strong>brand is ADIDAS AND brand is NIKE</strong> instead of the comma-separated \"is one of\" list — a single product's brand can never equal both at once, so that rule can never match anything and never fires. Option C folds both conditions into one rule with a single flat boost of 2.0: it only rewards the exact intersection (a shoe that's also Nike or Adidas) and gives nothing to a Nike/Adidas accessory or to another brand's shoe, losing the two independent, stackable signals you actually want."
          },
          {
            key: "custom-results-filter",
            title: "6. Searches for discounted products return nothing useful",
            question: "Looking at the old search engine's stats, you find plenty of searches like \"shoes discounted\" and \"shoes on sale\" — but none of them ever surfaced Doostride's actual discounted products.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">You decide to set up a <strong>Custom Result</strong> scoped to those two search terms. Instead of manually picking products one by one — a list that would go stale the moment a discount starts or ends — you want it to automatically show whichever products are currently discounted.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">For each field below, choose the value range the Custom Result should filter by — or \"Not used\" if that field shouldn't be part of this filter at all:",
            fields: [
              { key: "f_calculated_discount", label: "calculated_discount", type: "select", options: ["Not used", "0 to 100", "50 to 100", "Greater than 50"], correct: "0 to 100" },
              { key: "f_price", label: "price", type: "select", options: ["Not used", "Under 50", "Over 100"], correct: "Not used" },
              { key: "f_sale_price", label: "sale_price", type: "select", options: ["Not used", "Under 50", "Over 100"], correct: "Not used" },
              { key: "f_availability", label: "availability", type: "select", options: ["Not used", "In stock", "Out of stock"], correct: "Not used" },
              { key: "f_category", label: "category", type: "select", options: ["Not used", "Shoes", "Apparel"], correct: "Shoes" },
              { key: "f_brand", label: "brand", type: "select", options: ["Not used", "Nike", "Adidas"], correct: "Not used" },
              { key: "f_gender", label: "gender", type: "select", options: ["Not used", "Man", "Woman", "Unisex"], correct: "Not used" }
            ],
            explain: "Two conditions get you what you want: <strong>calculated_discount</strong> from <strong>0 to 100</strong> catches every product that has any discount at all, whatever its size, and <strong>category</strong> = <strong>Shoes</strong> keeps the result scoped to shoes, matching what \"shoes discounted\" and \"shoes on sale\" are actually asking for. Since it's a filter rather than a manually curated list, the Custom Result stays accurate on its own as discounts start and end — no one has to remember to update it. price and sale_price only describe how much something costs, not whether it's discounted right now; availability, brand and gender don't identify discounted shoes either, so they stay unused. In the next step, you'll see how this looks once it's actually configured."
          },
          {
            key: "custom-results-config",
            title: "7. Configuring the Custom Result",
            question: "You now need to actually build the <strong>Custom Result</strong>, named \"SHOES IN SALE\" and scoped to the exact-match terms \"shoes on sale\" and \"shoes discounted\", around <strong>calculated_discount</strong> (0 to 100) and <strong>category</strong> = <strong>Shoes</strong>.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze these 4 images, each showing a different configuration, and choose the one that gets you what you want:",
            fields: [
              { key: "correctconfig", type: "image-select", layout: "column", thumbCols: 2, mediaWidth: 560, options: [
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
            title: "8. Searching by code isn't flexible",
            question: "Analyze the 5 images above, each showing a different Search Fields configuration, and choose the one that gets you what you want:",
            fields: [
              { key: "correctconfig", type: "image-select", layout: "column", thumbCols: 4, thumbAspect: "1.65", stacked: true, mediaWidth: 1000,
                trailingNote: "Doostride's catalogue now has an <strong>mpn</strong> field: 4 three-character blocks — category, brand, color and size — like <code>SHODRMBLA005</code> for a size 5 black Dr Martens shoe. You want the team to search by just <strong>part</strong> of that code: typing <code>SHOCON</code> should find every <strong>Shoes</strong> product from <strong>Converse</strong>, and <code>SHODRMRED</code> every red <strong>Shoes</strong> product from <strong>Dr Martens</strong> — without anyone typing the full code.",
                options: [
                { value: "a", src: "img/search-fields-final-a.png", alt: "Search Fields with brand 2, categories 2, description 1, df_all 1, gtin 1, mpn 1, mpn.light_explode 1, title 3, title.autocomplete 1", caption: "Option A" },
                { value: "b", src: "img/search-fields-final-b.png", alt: "Search Fields with brand 2, categories 2, description 1, df_all 1, gtin 1, mpn 8, title 8, title.autocomplete 1 — no mpn.light_explode field at all", caption: "Option B" },
                { value: "c", src: "img/search-fields-final-c.png", alt: "Search Fields with brand 2, categories 2, df_all 1, gtin 1, id.light_explode 1, mpn 1, title 3, title.autocomplete 1 — id.light_explode instead of mpn.light_explode, and no description field", caption: "Option C" },
                { value: "d", src: "img/search-fields-final-d.png", alt: "Search Fields with brand 2, brand.autocomplete 1, categories 2, color 1, df_all 1, gtin 1, mpn 1, title 3, title.autocomplete 1 — no light_explode field of any kind", caption: "Option D" },
                { value: "e", src: "img/search-fields-final-e.png", alt: "Search Fields with brand 2, brand.autocomplete 1, categories 2, color 1, df_all 1, gtin 1, mpn 1, size 1, title 3, title.autocomplete 1 — same as Option D plus a size field, still no light_explode field of any kind", caption: "Option E" }
              ], correct: "a" }
            ],
            explain: "Option A is correct: it keeps every existing field as it was and simply adds <strong>mpn.light_explode</strong> with a weight of 1, which is exactly what unlocks partial-code matches like <code>SHOCON</code> or <code>SHODRMRED</code> without disturbing anything else. Option B skips <code>mpn.light_explode</code> entirely and instead cranks up the weight of plain <strong>mpn</strong> (and <strong>title</strong>) to 8 — a huge, risky weight change that still only rewards the complete code, since a bigger weight doesn't add the ability to match a partial one. Option C adds <code>id.light_explode</code> instead of <code>mpn.light_explode</code> — the wrong field, since it unpacks the <strong>id</strong> field, not <strong>mpn</strong>, so partial mpn codes still won't match — and it also drops <strong>description</strong> from the list entirely. Options D and E don't add any <code>light_explode</code> field at all; they add <code>brand.autocomplete</code> and <code>color</code> instead (E also throws in <code>size</code>), which help with other kinds of searches but do nothing for a compound code with no word boundaries to split on."
          }
        ],
        replyWhatsapp: {
          name: "Amanda House",
          outgoing: true,
          body: [
            "Hi John,",
            "Good news — I dug into the <strong>Search Layer</strong>'s configuration and sorted out everything you flagged.",
            "Out-of-stock products were tying in score with in-stock ones, so I added <strong>Availability</strong> as a tiebreak right after Score, with price breaking any tie left after that — in-stock products now always come first.",
            "I also set up a <strong>Boosting Rule</strong> so our Nike and Adidas shoes get extra relevance no matter what's searched, which is why \"comfort\" was surfacing a Nike cap over our actual shoes.",
            "\"Shoes on sale\" and \"shoes discounted\" now return a <strong>Custom Result</strong> scoped to whatever's currently discounted, so it stays accurate as sales start and end.",
            "And I added <strong>mpn.light_explode</strong> to Search Fields, so typing part of a product code like SHOCON or SHODRMRED now finds every matching shoe, not just full codes.",
            "Everything's live — happy to walk you through it whenever works for you.",
            "Best,<br>Amanda"
          ],
          times: ["18:12", "18:12", "18:13", "18:14", "18:15", "18:16", "18:16"]
        }
      }
    }
  ]
};
