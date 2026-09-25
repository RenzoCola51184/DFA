/* Doofinder Academy — course content (Module 1, Section 1)
   Sections 2-6 each have a theory block and a step-by-step quiz.
   Section 7 is the final guided exercise. Sections 0 and 1 are the
   course presentation and its scene-setting intro, with no quiz. */

const COURSE = {
  nextSection: { label: "Go to Module 1 Section 2 →", href: "section2.html" },
  storyline: {
    persona: "John River",
    company: "Doostride",
    role: "CEO",
    email: "john.river@doostride.com"
  },
  sections: [
    {
      id: 0,
      code: "0",
      navGroup: "COURSE PRESENTATION",
      navLabel: "Course Presentation",
      eyebrow: "0. COURSE PRESENTATION",
      title: "Course Presentation",
      hasQuiz: false,
      docUrl: "https://support.doofinder.com",
      pages: [
        {
          intro: [
            "Welcome to the <strong>Doofinder Academy</strong> course!",
            "This course is designed to provide a deep dive into the most important aspects of Doofinder, giving the knowledge needed to become an expert in using it.",
            "The course is organized into <strong>modules</strong>, each one covering a major area of Doofinder. Every module is broken down into <strong>sections</strong>, and each section focuses on a specific topic through a series of <strong>lessons</strong>.",
            "Each section unfolds through a simulated real-world scenario, placing you in a specific role and set of tasks to work through Doofinder's tools hands-on.",
            "Every lesson ends with a short <strong>quiz</strong>, and every section wraps up with a <strong>final exercise</strong>. Each quiz contributes to the overall score, and all of those scores together make up the overall course score.",
            "Some lessons are backed by specific <strong>documentation</strong>, linked in the sidebar, to dive deeper into that lesson's particular topic.",
            "The final exercise of each section is there to resolve the requests raised in that section's simulated scenario, putting into practice what the section has introduced.",
            "Here's how the course is laid out."
          ],
          schema: `
            <div class="course-index">
              <div class="course-index-module">
                <div class="course-index-module-title">Module 1 — An introduction to Doofinder and its core features</div>
                <ol class="course-index-list">
                  <li><span class="course-index-section">Section 1</span> Getting started and Search Layer installation</li>
                  <li><span class="course-index-section">Section 2</span> How Doofinder Search Works and Search Engine Features: Relevance, Boosting and Custom Results</li>
                  <li><span class="course-index-section">Section 3</span> More Search Engine Features: Grouping Variants, Excluded Results, Synonyms, Copy Settings, Redirections and Banners</li>
                  <li><span class="course-index-section">Section 4</span> Quiz feature</li>
                  <li><span class="course-index-section">Section 5</span> AI feature</li>
                </ol>
              </div>
              <div class="course-index-module">
                <div class="course-index-module-title">Module 2</div>
                <p class="course-index-module-desc">Integrating Doofinder into a B2B environment on a custom platform, template customization, and advanced concepts.</p>
                <ol class="course-index-list">
                  <li><span class="course-index-section">Section 1</span> B2B — hidden prices for logged-out users, user variants and the multi-price concept</li>
                  <li><span class="course-index-section">Section 2</span> Template customization</li>
                  <li><span class="course-index-section">Section 3</span> Advanced concepts — search params, JS events</li>
                </ol>
              </div>
              <div class="course-index-module">
                <div class="course-index-module-title">Module 3</div>
                <p class="course-index-module-desc">API and plugin concepts.</p>
                <ol class="course-index-list">
                  <li><span class="course-index-section">Section 1</span> API search</li>
                  <li><span class="course-index-section">Section 2</span> API for managing data</li>
                  <li><span class="course-index-section">Section 3</span> Common concepts across plugins — pagination, and more</li>
                  <li><span class="course-index-section">Section 4</span> PrestaShop</li>
                  <li><span class="course-index-section">Section 5</span> Shopify — Shopify web pixel, and more</li>
                </ol>
              </div>
              <div class="course-index-module">
                <div class="course-index-module-title">Module 4</div>
                <p class="course-index-module-desc">Debugging tool issues.</p>
                <ol class="course-index-list">
                  <li><span class="course-index-section">Section 1</span> Grafana</li>
                  <li><span class="course-index-section">Section 2</span> Dev browser tools</li>
                </ol>
              </div>
            </div>`
        }
      ]
    },
    {
      id: 1,
      code: "1",
      moduleTag: "Module 1 Section 1",
      sideLabel: "MODULE 1 SECTION 1",
      navGroup: "INTRODUCTION",
      navLabel: "Introduction",
      eyebrow: "1. INTRODUCTION",
      title: "Introduction",
      hasQuiz: false,
      pages: [
        {
          intro: [
            "Meet <strong>Doostride</strong>, an online store selling footwear and streetwear. In this section, you are <strong>Mark Park</strong>, a junior developer there, fresh out of university, hired a few months ago. This morning <strong>John River</strong>, Doostride's CEO, reached out with an email, cc'ing <strong>Amanda House</strong>, the site's ecommerce manager.",
            "He's just sent you this email:"
          ],
          email: {
            name: "John River",
            address: "john.river@doostride.com",
            cc: "Amanda House",
            subject: "Trying out <strong>Doofinder</strong>'s Search Layer on our site",
            body: [
              "Hi,",
              "Amanda and I came across <strong>Doofinder</strong> at an ecommerce expo in London, and it caught our attention. Looks like it actually bundles several different tools together — for now, what we'd really like to try is the Search Layer.",
              "Amanda has gone ahead and created a Doofinder account for Doostride. Here's the link to Doofinder's support page, in case it helps: <a href=\"https://support.doofinder.com\" target=\"_blank\" rel=\"noopener\">support.doofinder.com</a>.",
              "Could you take a look and see what needs to be done to get the Search Layer running on our local test copy of the site? We'd like to try it out there before we think about rolling it out on the live store.",
              "Let us know what you find out.",
              "Best,<br>John River<br>Doostride — CEO"
            ]
          },
          outro: [
            "Before you can answer John, there's some groundwork to cover. You'll find the local test copy of the Doostride site under the <strong>Demo Store</strong> tab, at the top of this app — that's the local copy John is talking about, the one you'll be working on throughout this section.",
            "As for the Doofinder account Amanda already set up, you won't be logging into that one — instead, use your own Doofinder account and treat it as if it were hers.",
            "With that in place, your goal throughout this section is to get familiar with what Doofinder actually is and to set up its Search Layer on Doostride's local copy. Once the Search Layer is up and running, reply to John and Amanda to let them know it's done."
          ]
        }
      ]
    },
    {
      id: 2,
      code: "2",
      moduleTag: "Module 1 Section 1",
      navGroup: "WHAT IS DOOFINDER",
      navLabel: "What is Doofinder",
      eyebrow: "2. WHAT IS DOOFINDER",
      title: "What is Doofinder",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/getting-started/what-is-doofinder",
      theory: {
        lead: "<strong>Doofinder</strong> is a multi-product service that helps online shops increase sales by enhancing the search experience for users and potential customers, making it easier for them to find exactly what they're looking for.",
        blocks: [
          {
            html: `
              <h3>Integration</h3>
              <p>Doofinder can be integrated into virtually any web or ecommerce platform, via script or via API. Most of the time integration is done via script, so throughout this course we'll focus on that approach, and cover the API separately later in the course. Doofinder offers integration plugins for the most popular platforms — Shopify, WooCommerce, Magento, PrestaShop and 10+ others — but it can also be installed on a custom-built website.</p>

              <h3>Stores and Search Engines</h3>
              <p>To start using Doofinder, an account needs to be created on the Doofinder website. From the <strong>Admin Panel</strong>, Doofinder can be installed on different domains:</p>
              <table class="theory-table">
                <thead><tr><th>Element</th><th>What it is</th><th>Identified by</th></tr></thead>
                <tbody>
                  <tr><td><strong>Store</strong></td><td>Each domain is linked to a Store, along with its own unique <strong>Installation Script</strong></td><td>Its own <strong>Store ID</strong></td></tr>
                  <tr><td><strong>Search Engine</strong></td><td>A Store can have several Search Engines, each one configured with its own languages and currencies</td><td>A unique <strong>Hash ID</strong></td></tr>
                </tbody>
              </table>
              <p class="theory-callout">The Search Engine is where product data is managed. It's fed with all the information about the products, blog articles and pages in the shop.</p>

              <h3>The Five Products</h3>
              <p>Doofinder is divided into five major products:</p>
              <table class="theory-table">
                <thead><tr><th>Product</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><strong>Search Layer</strong></td><td>The search box/results interface shown to the users</td></tr>
                  <tr><td><strong>Recommendations</strong></td><td>Carousels generated from user behaviour, for cross-selling and upselling</td></tr>
                  <tr><td><strong>Quiz Maker</strong></td><td>Guided quizzes that steer users to matching products, with lead-generation forms built in</td></tr>
                  <tr><td><strong>AI Assistant</strong></td><td>A conversational assistant that helps users find what they need through natural, chat-based search</td></tr>
                  <tr><td><strong>Category Merchandising</strong></td><td>Controls how products are sorted and highlighted within category listing pages</td></tr>
                </tbody>
              </table>

              <h3>The Search Layer in Action</h3>
              <div class="gif-preview gif-preview-stacked">
                <div class="gif-image">
                  <img src="img/search_layer_example.gif" data-base-src="img/search_layer_example.gif" alt="Animated example of the Doofinder Search Layer opening and returning results on a website" data-action="zoom-image">
                  <canvas class="gif-freeze-canvas"></canvas>
                  <button type="button" class="gif-toggle-btn" data-action="toggle-gif" aria-label="Pause animation"><svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><rect x="3" y="2" width="3.4" height="12" rx="1"></rect><rect x="9.6" y="2" width="3.4" height="12" rx="1"></rect></svg></button>
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </div>
                <div class="gif-text">
                  <p>Here's an example of how the <strong>Search Layer</strong> works on a website. Later in the course, examples of the other products will be covered too.</p>
                  <p>As the animation shows, it's an overlay that appears on the page and instantly displays results matching the search term as it's typed, letting users find the products they're looking for quickly and effortlessly.</p>
                  <p>All of the Search Layer's features — filter configuration, sorting configuration, and more — will be covered in more detail later in the course.</p>
                </div>
              </div>`
          }
        ]
      },
      quiz: [
        {
          q: "Which of these best describes <strong>Doofinder</strong>?",
          options: [
            "A payment gateway for online stores",
            "A shipping-label printing service",
            "A multi-product service that increases sales by improving the site's search experience",
            "An email marketing autoresponder"
          ],
          correct: 2,
          explain: "<strong>Doofinder</strong> is a multi-product service built to help online shops increase sales by making it easier for users to find what they're looking for."
        },
        {
          q: "Which of these statements is true?",
          options: [
            "<strong>Doofinder</strong> cannot be installed on a custom-built website",
            "<strong>Doofinder</strong> can only be added through a browser extension",
            "<strong>Doofinder</strong> can be integrated via script or API, and also offers integration plugins for popular platforms",
            "<strong>Doofinder</strong> can only be integrated by rebuilding the site from scratch"
          ],
          correct: 2,
          explain: "<strong>Doofinder</strong> offers integration plugins for platforms like Shopify, WooCommerce, Magento and PrestaShop, and can also be installed manually via script or API on a custom website."
        },
        {
          q: "Which of these is one of the platforms <strong>Doofinder</strong> offers an integration plugin for?",
          options: ["Shopify", "Zoom", "Trello", "Salesforce CRM"],
          correct: 0,
          explain: "<strong>Doofinder</strong> offers integration plugins for platforms like Shopify, WooCommerce, Magento and PrestaShop, among others."
        },
        {
          q: "What uniquely identifies a <strong>Doofinder</strong> Store?",
          options: ["A Hash ID", "A CSS selector", "A feed URL", "A Store ID"],
          correct: 3,
          explain: "Every Store gets its own Store ID, along with a name, its shop's URL and its industry."
        },
        {
          q: "What does every Store use to connect <strong>Doofinder</strong> to its website?",
          options: [
            "A shared installation script, used for all the Stores",
            "A unique Installation Script",
            "An FTP upload",
            "A browser plugin only"
          ],
          correct: 1,
          explain: "Each Store uses its own unique Installation Script to connect <strong>Doofinder</strong> to the site."
        },
        {
          q: "What uniquely identifies a Search Engine?",
          options: [
            "Its domain name, used for billing",
            "Its Hash ID",
            "Its industry category, used for indexing",
            "Its currency, used to identify the Store"
          ],
          correct: 1,
          explain: "Each Search Engine has its own Hash ID, which synchronizes the website with its associated data feed."
        },
        {
          q: "What is the Search Engine responsible for?",
          options: [
            "Managing your product and content data",
            "Hosting your website",
            "Sending marketing emails",
            "Processing payments"
          ],
          correct: 0,
          explain: "The Search Engine is where product data is managed, along with content data like blog articles and pages."
        },
        {
          q: "Which five major products is <strong>Doofinder</strong> divided into?",
          options: [
            "Search Layer, Live Chat, Quiz Maker, AI Assistant and Category Merchandising",
            "Recommendations, Analytics, Quiz Maker, AI Assistant and Category Merchandising",
            "Search Layer, Recommendations, Email Marketing, AI Assistant and Category Merchandising",
            "Search Layer, Recommendations, Quiz Maker, AI Assistant and Category Merchandising"
          ],
          correct: 3,
          explain: "<strong>Doofinder</strong> is divided into five major products: Search Layer, Recommendations, Quiz Maker, AI Assistant and Category Merchandising."
        }
      ]
    },
    {
      id: 3,
      code: "3",
      moduleTag: "Module 1 Section 1",
      navGroup: "INSTALLING DOOFINDER",
      navLabel: "Installing Doofinder",
      eyebrow: "3. INSTALLING DOOFINDER",
      title: "Installing Doofinder",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/getting-started/installing-doofinder",
      extraDocs: [
        { label: "Create a Search Engine", url: "https://support.doofinder.com/getting-started/create-a-search-engine", fromHeading: "Create a Search Engine" }
      ],
      theory: {
        lead: "Once an account is created on Doofinder's website, getting it live on a site consists of a guided flow through four steps.",
        blocks: [
          {
            html: `
              <h3>The Four Steps</h3>
              <div class="install-steps">
                <div class="install-step-carousel">
                    <img src="img/install-step1-create-store-landing.png" alt="Doofinder home screen with a Create store button, next to an explanation of what a Store is and why to create one" data-action="zoom-image" class="is-active">
                    <img src="img/install-step1-create-store-form.png" alt="Create Store form asking for the site's URL, the platform it runs on, and its industry" data-action="zoom-image">
                    <img src="img/install-step2-create-search-engine.png" alt="Create Search Engine form with data type, indexing method, language and currency fields" data-action="zoom-image">
                    <img src="img/install-step3-css-selector.png" alt="Tell us where your search bar is screen, with a CSS selector field that accepts a format like #search-box, input[name='q'], .input-search, and a Create button" data-action="zoom-image">
                    <img src="img/install-step4-connect-store.png" alt="Store connection screen showing the installation script to copy into the website's code, with a stepper marking Store information, Search Engine creation and Search bar location as already complete" data-action="zoom-image">
                    <button type="button" class="carousel-next-btn" data-action="carousel-next">Next step →</button>
                </div>
                <div class="install-step-captions">
                  <div class="install-step-caption is-active"><span class="install-step-caption-label">Getting started</span><strong>Click Create store</strong><p>To create the account's first Store, go to the <strong>Home</strong> section of the account and click <strong>Create store</strong>. This opens the guided flow.</p></div>
                  <div class="install-step-caption"><span class="install-step-caption-label">Step 1 of 4</span><strong>Create a Store</strong><p>Provide the site's full URL, its industry, and the platform it runs on (custom sites are detected as "Other").</p></div>
                  <div class="install-step-caption"><span class="install-step-caption-label">Step 2 of 4</span><strong>Create a Search Engine</strong><p>Configure the data type (Product or Other data), the indexing method (File or Feed URL, or API), the results language, and — for product data — the currency.</p></div>
                  <div class="install-step-caption"><span class="install-step-caption-label">Step 3 of 4</span><strong>Set the CSS selector manually</strong><p>This identifies which element on the page needs to be clicked for the Search Layer to appear.</p></div>
                  <div class="install-step-caption"><span class="install-step-caption-label">Step 4 of 4</span><strong>Connect the store with an installation script</strong><p>Once the Store and Search Engine exist, add the script provided into the website's code to finish the connection.</p></div>
                </div>
              </div>

              <h3>The Installation Script</h3>
              <p>The Doofinder script has this structure:</p>
              <pre class="code-block"><code>&lt;script src="https://<span class="tok">eu1</span>-config.doofinder.com/2.x/<span class="tok">STORE_ID</span>.js" async&gt;&lt;/script&gt;</code></pre>
              <p>The <strong>Zone</strong> identifies which Doofinder server the account resides on, depending on which part of the world the account was created in: <code>eu1</code> for Europe, <code>us1</code> for the Americas, or <code>ap1</code> for Asia-Pacific.</p>
                <p>The <code>STORE_ID</code> is the unique identifier generated when the Store is created, and it's what identifies that Store within the script.</p>
                <p>This script needs to be added to the site's HTML code — ideally in the header or footer. The script can also be integrated via Google Tag Manager.</p>

              <h3>Integration Plugins</h3>
              <p>As already mentioned, Doofinder offers integration plugins for some platforms, which handle this process almost automatically (more on this later in the course). In this case, the matching platform needs to be selected when creating the Store, and the plugin takes care of adding the script into the website's code automatically.</p>
              <p class="theory-callout">It isn't mandatory to use the integration plugin on platforms where one is available — manual integration is still available, simply by selecting "Other" as the platform.</p>`
          },
          {
            heading: "Create a Search Engine",
            pageBreak: true,
            html: `
              <figure class="lesson-figure lesson-figure-left" style="width: 340px; max-width: 55%;">
                  <img src="img/create-search-engine-es-button.png" alt="Search Engine selector dropdown with the Create Search Engine button highlighted" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>A Search Engine is a configured instance that stores and indexes a specific type of data — once a Store has one, it's common to end up needing several more.</p>

              <h3>Why Several Search Engines</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 320px; max-width: 55%;">
                  <img src="img/install-step2-create-search-engine.png" alt="Create Search Engine form with data type, indexing method, language and currency fields" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>That's usually because ecommerces and websites often operate across different markets, each with its own language and currency. A store might sell to both an English-speaking and a Spanish-speaking market at the same time, or price the same products in different currencies depending on where they're sold.</p>
                  <p>Products can even have different URLs between storefronts, since the same domain can serve more than one storefront configuration — each combination of language, currency and product links needs its own data feed, and therefore its own Search Engine, each getting its own Hash ID.</p>
                  <p>For example, a store selling in both English and Spanish would typically create one Search Engine per language, each indexing its own translated catalogue. Splitting them this way also splits their statistics, since Doofinder reports them separately per Search Engine — useful for comparing how each one is performing on its own.</p>

              <h3>After Indexing</h3>
              <p>Once indexing finishes successfully, Search, Recommendations and Quiz Maker all become configurable for that Search Engine.</p>
              <p class="theory-callout">If indexing fails or returns zero products, the corresponding Layer stays in an error state until the underlying feed is fixed and re-indexed — the same behaviour already covered earlier in this lesson.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "Is it mandatory to use <strong>Doofinder</strong>'s integration plugin on a platform where one is available?",
          options: [
            "Yes, it's the only supported method",
            "No, the script can still be added manually instead",
            "Only for ecommerce platforms",
            "Only if the site has no CSS selector"
          ],
          correct: 1,
          explain: "It isn't mandatory to use the integration plugin on platforms where one is available — manual integration is still available, simply by selecting \"Other\" as the platform."
        },
        {
          q: "What do you provide when creating a Store?",
          options: [
            "Your site's full URL, its industry, and the platform it runs on",
            "Your payment details and tax ID",
            "A list of your top 10 products",
            "Your customer support email"
          ],
          correct: 0,
          explain: "Creating a Store means providing your site's full URL, its industry, and the platform it runs on."
        },
        {
          q: "What does the STORE_ID in the installation script identify?",
          options: [
            "The results language",
            "The industry your Store belongs to",
            "That specific Store within the script",
            "The Search Engine's indexing method"
          ],
          correct: 2,
          explain: "The STORE_ID is the unique identifier generated when the Store is created, and it identifies that Store within the script."
        },
        {
          q: "What does the Zone in the installation script identify?",
          options: [
            "The currency used for prices",
            "Which <strong>Doofinder</strong> server your account resides on",
            "The Search Engine's data type",
            "The CSS selector to use"
          ],
          correct: 1,
          explain: "The Zone (eu1, us1 or ap1) identifies which <strong>Doofinder</strong> server your account resides on, depending on which part of the world the account was created in."
        },
        {
          q: "Besides pasting it directly into the site's HTML, how else can the installation script be integrated?",
          options: [
            "It can't be integrated any other way",
            "Through your hosting provider's support team",
            "By emailing the script to <strong>Doofinder</strong>",
            "Through Google Tag Manager"
          ],
          correct: 3,
          explain: "The script can also be integrated via Google Tag Manager."
        },
        {
          q: "What is a Search Engine, in <strong>Doofinder</strong> terms?",
          options: [
            "A configured instance that stores and indexes a specific type of data",
            "The plugin that connects Doofinder to a platform",
            "The physical server where Doofinder runs",
            "A billing account for a specific market"
          ],
          correct: 0,
          explain: "A Search Engine is a configured instance that stores and indexes a specific type of data, identified by its own Hash ID."
        },
        {
          q: "Which of these is a reason a Store might need several Search Engines?",
          options: [
            "Operating across different markets, each with its own language and currency",
            "Because <strong>Doofinder</strong> limits each Store to a single CSS selector",
            "Because the installation script only supports one Zone",
            "Because Recommendations requires a dedicated Search Engine"
          ],
          correct: 0,
          explain: "Ecommerces often operate across different markets, each with its own language and currency, and sometimes with different product links per storefront — every such combination needs its own Search Engine."
        },
        {
          q: "Why is it useful to sometimes create several Search Engines within the same Store?",
          options: [
            "Because it's required to generate the STORE_ID",
            "Because a Store can only have one CSS selector otherwise",
            "Because <strong>Doofinder</strong> reports statistics separately per Search Engine, e.g. letting you compare performance across languages",
            "Because indexing only works with a single Search Engine per Store"
          ],
          correct: 2,
          explain: "Splitting data across several Search Engines — e.g. one per language — also splits their statistics, so you can compare how each one is performing on its own."
        },
        {
          q: "A domain has two storefronts in two different languages. How is this typically set up in <strong>Doofinder</strong>?",
          options: [
            "The same Store, and therefore the same installation script, is used — but each storefront is served by its own Search Engine",
            "Two separate Stores must be created, each with its own installation script",
            "A single Search Engine handles both languages automatically",
            "Each storefront needs its own STORE_ID"
          ],
          correct: 0,
          explain: "The same Store — and therefore the same installation script — can serve multiple storefronts. Each language or market gets its own Search Engine, so the same script keeps working across all of them."
        }
      ]
    },
    {
      id: 4,
      code: "4",
      moduleTag: "Module 1 Section 1",
      navGroup: "CSS SELECTOR",
      navLabel: "CSS Selector",
      eyebrow: "4. CSS SELECTOR",
      title: "CSS Selector",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/getting-started/css-selector",
      theory: {
        lead: "A <strong>CSS Selector</strong> is the pattern that tells a browser which HTML element of a web page a style should apply to. The same syntax is also reused in JavaScript to target an element to hook a script or widget onto.",
        blocks: [
          {
            html: `
              <p>In Doofinder, CSS Selectors are used, for example, to identify the element that should open the Search Layer (usually the site's search box), the container that should host a Recommendations carousel, or the button that should launch a Quiz.</p>

              <h3>Three Ways to Write a Selector</h3>
              <p>So, a selector is just a short string that says "find this one element in the page", and there are three ways to write it, depending on what the underlying HTML gives to work with:</p>
              <table class="theory-table">
                <thead><tr><th>Selector</th><th>Type</th><th>When to use it</th></tr></thead>
                <tbody>
                  <tr><td><code>#custom-search</code></td><td><strong>ID selector</strong>, prefixed with <code>#</code></td><td>IDs are meant to be unique on a page, which makes this the safest and most precise option whenever the element has one.</td></tr>
                  <tr><td><code>.search-field</code></td><td><strong>Class selector</strong>, prefixed with <code>.</code></td><td>Classes are often shared by several elements, so make sure the one picked only matches the element actually wanted. An element can carry several classes at once (e.g. <code>class="search-field icon-search"</code>); to target that specific combination, chain them by replacing the space with a dot: <code>.search-field.icon-search</code>.</td></tr>
                  <tr><td><code>input[name="s"]</code></td><td><strong>Name-attribute selector</strong></td><td>Useful for form fields that carry a <code>name</code> attribute but no ID or class of their own.</td></tr>
                </tbody>
              </table>

              <h3>Finding a Selector</h3>
              <p>The simplest way to find a CSS Selector is through the browser's dev tools: right-click the element and choose <strong>Inspect</strong> to open the Elements panel with its HTML highlighted, showing its <code>id</code>, <code>class</code> or <code>name</code> attribute. If it has none, dev tools also offer <strong>Copy &gt; Copy selector</strong> — but treat it as a last resort, since it generates a long, fragile path that breaks the moment the markup changes.</p>
              <p class="theory-callout">A few habits keep a selector from breaking after a redesign: prefer IDs and hand-placed wrapper <code>div</code>s over autogenerated classes; keep selectors short; and check both desktop and mobile in dev tools, combining both selectors with a comma when the markup differs between them (e.g. <code>#search-desktop, #search-mobile</code>).</p>

              <h3>A Real Case</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 420px; max-width: 55%;">
                  <img src="img/CSS_Selector.png" alt="Chrome dev tools Inspect panel highlighting the search box on Doostride's demo store, showing button.search-bar__input" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Here's a real case: right-clicking the search box and choosing Inspect, in order to inspect that element.</p>
                  <p>This element can be selected, for example, with these CSS Selectors:</p>
                  <ul>
                    <li><code>.search-bar__input</code> — the class selector. Easy to read and use, since it maps directly to the name shown in the HTML.</li>
                    <li><code>button[name="q"]</code> — the name-attribute selector. Also lands on exactly this element, since <code>q</code> is the query-string parameter Doofinder submits the search under.</li>
                    <li><code>button[type="text"]</code> — another name-attribute selector, matching on the <code>type</code> attribute instead.</li>
                  </ul>
              <p class="theory-callout">What to avoid: chaining the whole nested path, e.g. <code>.search-bar-top-wrapper &gt; .search-bar__top &gt; .search-bar__input-wrapper &gt; button</code> — it depends on every wrapper staying put, and breaks silently the moment a redesign moves one.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "In <strong>Doofinder</strong>, what can a CSS Selector be used to identify?",
          options: [
            "The site's DNS records",
            "The Store's billing plan",
            "The Search Engine's Hash ID",
            "The element that triggers the Search Layer or hosts a Recommendations carousel"
          ],
          correct: 3,
          explain: "CSS Selectors identify elements like the search box that should open the Search Layer, the container for a Recommendations carousel, or the button that launches a Quiz."
        },
        {
          q: "What does the selector #search identify?",
          options: [
            "A unique element on the page",
            "A class of elements, possibly shared by several nodes",
            "Any element with a name attribute",
            "Every element nested inside a container"
          ],
          correct: 0,
          explain: "The # prefix denotes an ID selector — IDs are meant to be unique on a page, so #search identifies a single, specific element."
        },
        {
          q: "Which prefix denotes a class selector?",
          options: ["#", "$", ".", "%"],
          correct: 2,
          explain: "Classes are prefixed with a dot (e.g. .search-field)."
        },
        {
          q: "What's the recommended way to find an element's selector?",
          options: [
            "Guess based on the page design",
            "Right-click the element and choose Inspect in dev tools",
            "Ask the <strong>Doofinder</strong> support bot to scan the site",
            "Read the site's robots.txt"
          ],
          correct: 1,
          explain: "Right-clicking the element and choosing Inspect in dev tools shows its exact ID, class or name attribute."
        },
        {
          q: "Besides copying an ID, class or name attribute, what other option does 'Inspect' offer that should be treated as a last resort?",
          options: [
            "Copy > Copy selector, which generates a long, structure-dependent path",
            "Copy > Copy as cURL",
            "Save as PDF",
            "View page source"
          ],
          correct: 0,
          explain: "Dev tools' 'Copy selector' generates a long, structure-dependent path that's more likely to break when the HTML changes."
        },
        {
          q: "An element has <code>class=\"search-field icon-search\"</code>. How do you write a selector that targets that specific combination?",
          options: [
            "Use only the first class: .search-field",
            "Separate them with a comma: .search-field, .icon-search",
            "Chain them by replacing the space with a dot: .search-field.icon-search",
            "Wrap them in brackets: [search-field icon-search]"
          ],
          correct: 2,
          explain: "Multiple classes on the same element are chained by replacing the space with a dot, e.g. .search-field.icon-search — a comma would instead select two separate elements."
        },
        {
          q: "What does the selector <code>input[name=\"s\"]</code> identify?",
          options: [
            "Any element with a class named s",
            "An input element whose name attribute equals \"s\"",
            "Every input on the page",
            "An element with ID s"
          ],
          correct: 1,
          explain: "Square brackets target an attribute — here, an &lt;input&gt; whose name attribute is exactly \"s\"."
        },
        {
          q: "Which of these should be avoided as a selector, since it's more likely to break after a redesign?",
          options: [
            "A stable wrapper #search-box",
            "An autogenerated class or a long XPath",
            "An input's name attribute",
            "A short, hand-written class name"
          ],
          correct: 1,
          explain: "Autogenerated classes and XPaths tend to change often and break the setup."
        },
        {
          q: "Desktop and mobile use different search box markup. How can both be targeted in one selector field?",
          options: [
            "It can't be done — pick only one",
            "Use the word 'and' between them",
            "Wrap both in an XPath",
            "Separate the two selectors with a comma"
          ],
          correct: 3,
          explain: "Comma-separated selectors let both elements be targeted, one per device."
        }
      ]
    },
    {
      id: 5,
      code: "5",
      moduleTag: "Module 1 Section 1",
      navGroup: "INDICES AND THE DATA FEED",
      navLabel: "Indices and the Data Feed",
      eyebrow: "5. INDICES AND THE DATA FEED",
      title: "Indices and the Data Feed",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/getting-started/the-data-feed",
      extraDocs: [
        { label: "The Product Data Feed", url: "https://support.doofinder.com/managing-data/the-product-data-feed", fromHeading: "The Product Data Feed" },
        { label: "Field Name Mapping", url: "https://support.doofinder.com/managing-data/field-name-mapping", fromHeading: "Field Name Mapping" }
      ],
      theory: {
        lead: "",
        blocks: [
          {
            html: `
              <p>We've already said the Search Engine is where an item's data is managed. But how is that data actually stored? The data is stored in <strong>indices</strong>.</p>
              <p>An index is like a box where data is processed and organized, ready to be searched. This process is called <strong>indexing</strong>.</p>

              <h3>Two Ways to Feed an Index</h3>
              <p>There are two ways to feed an index:</p>
              <table class="theory-table">
                <thead><tr><th>Method</th><th>How it works</th><th>Keeping data updated</th></tr></thead>
                <tbody>
                  <tr><td><strong>Indexing via File or URL</strong></td><td>Upload a file, or point to a URL containing that file, to process it into the index. By default, indexing runs once a day — we'll go into more detail on this later in the course.</td><td>The index needs to be processed in order to keep the data updated in Doofinder</td></tr>
                  <tr><td><strong>Indexing via API</strong></td><td>Sending API calls directly to the index, in order to upload, update or delete a product in the index.</td><td>Since the API calls are launched directly into the index, the index is kept updated in real time</td></tr>
                </tbody>
              </table>
              <p class="theory-callout">The main difference between these two ways is that, via File or URL, the index needs to be processed in order to keep the data updated in Doofinder, while via API, since the API calls are launched directly into the index, the index is kept updated in real time.</p>

              <h3>Indices and Sources</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 340px; max-width: 55%;">
                  <img src="img/indices-admin-panel.png" alt="Doofinder Admin Panel index screen, showing the products index with an Indexing with URL source and an Indexing with File source under Sources, plus an Add Source and a Process Now button" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>A Search Engine can have more than one index — usually, each index stores a different kind of item, for example one index for the products, another for the blog articles, and so on.</p>
                  <p>All of a catalog item's information must live inside the same source — it can't be split across several sources. In the image on the left, the products index is fed by two sources: one via URL (in <code>.xml</code> format), and one via File (in <code>.csv</code> format), each one listed under <strong>Sources</strong> along with its URL.</p>`
          },
          {
            heading: "The Product Data Feed",
            pageBreak: true,
            html: `
              <p>The most common way to index is via just one File or just one URL, usually a product data feed (a source can be classifed as product or generic, this one for the content data). Let's keep it simple for now and focus on using just one index, fed by just one product data feed (indexing via API, as well as the use of multiple indices, is explained later in the course).</p>

              <h3>What a Data Feed Is</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 400px; max-width: 55%;">
                  <img src="img/data-feed-spreadsheet-example.png" alt="Sample of a data feed opened as a spreadsheet, with a header row of field names (brand, id, price, title) followed by one row per item" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>A product data feed is a structured file that contains information about products and their fields. Doofinder needs to be fed with this information in order to display results when a customer performs a search.</p>
                  <p>This is what a data feed could look like in practice: as shown in the image on the right, it's a structure where each item's information is laid out according to a set of fields.</p>

              <h3>Formats</h3>
              <table class="theory-table">
                <thead><tr><th>Source</th><th>Formats</th><th>Optional compression</th></tr></thead>
                <tbody>
                  <tr><td><strong>File</strong></td><td><code>.txt</code>, <code>.xml</code> or <code>.csv</code></td><td><code>.zip</code>, <code>.gz</code> or <code>.bz2</code></td></tr>
                  <tr><td><strong>URL feed</strong></td><td>Can also be in <code>.jsonl</code> format</td><td><code>.gz</code> or <code>.tgz</code></td></tr>
                </tbody>
              </table>
              <p>The maximum file size is 625MB.</p>

              <h3>Fields</h3>
              <table class="theory-table">
                <thead><tr><th>Fields</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td><code>id</code>, <code>title</code></td><td>The only mandatory fields</td></tr>
                  <tr><td><code>link</code>, <code>image_link</code></td><td>Recommended fields — <code>link</code> is the URL of the product's page: without it, clicking a product in the Search Layer doesn't take the user to that product's page. <code>image_link</code> is the URL of the image the Search Layer shows for each result</td></tr>
                  <tr><td><code>price</code>, <code>sale_price</code></td><td>Depending on the type of item, other fields become strongly recommended too — for a product data feed, for example, these are a must</td></tr>
                </tbody>
              </table>
              <p class="theory-callout">The <code>id</code> field is a unique identifier — a number, a string, or an alphanumeric string — and it must be unique for every item in the feed. If two items share the same <code>id</code>, only one of them survives indexing: the one processed last overwrites the other.</p>
              <p>Some fields don't come from the data feed at all: Doofinder adds them automatically when indexing, even though they don't appear in the feed. Two of them are:</p>
              <ul>
                <li><code>best_price</code> — the lowest price between <code>price</code> and <code>sale_price</code>, so it's the price the product is actually sold at.</li>
                <li><code>calculated_discount</code> — for every product that has both <code>price</code> and <code>sale_price</code>, the discount as a percentage.</li>
              </ul>
              <p>For example:</p>
              <table class="theory-table">
                <thead><tr><th>Product</th><th><code>price</code> (in the feed)</th><th><code>sale_price</code> (in the feed)</th><th><code>best_price</code> (added by Doofinder)</th><th><code>calculated_discount</code> (added by Doofinder)</th></tr></thead>
                <tbody>
                  <tr><td><strong>Canvas Sneakers</strong></td><td>80.00</td><td>60.00</td><td>60.00</td><td>25 — a 25% discount</td></tr>
                  <tr><td><strong>Leather Belt</strong></td><td>40.00</td><td>—</td><td>40.00</td><td>Not added — there's no <code>sale_price</code>, so no discount to calculate</td></tr>
                </tbody>
              </table>

              <h3>XML, Google Shopping and Plugin Feeds</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 340px; max-width: 55%;">
                  <img src="img/data-feed-xml-example.png" alt="Same data feed opened directly as a .xml file at a feed URL, showing the raw channel/item structure with fields like availability, brand, categories, description, id, image_link, link, price and title" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>The image on the left shows what a data feed looks like in <code>.xml</code> format.</p>
                  <p>If a Google Shopping feed is already generated for advertising purposes, there's no need to build a separate one — Doofinder accepts that format as-is, with no reformatting required.</p>
                  <p>When using Doofinder's installation plugins for the different platforms, those plugins can create a data feed automatically, so there's no need to build one from scratch. As already mentioned for the installation script, using the data feed created by a plugin isn't mandatory even when the store runs on a supported platform — a custom data feed can still be used there too. The data feeds created by these plugins will be covered in more detail later in the course.</p>`
          },
          {
            heading: "Field Name Mapping",
            pageBreak: true,
            html: `
              <p><strong>Field Name Mapping</strong> links the field names in a feed to Doofinder's standard ('normalized') field names, for when they differ — or when the value needed is buried inside a nested object.</p>

              <h3>The Mapping Pop-up</h3>
              <p>In the Admin Panel, there is a pop-up with two columns:</p>
                  <table class="theory-table">
                    <thead><tr><th>Column</th><th>What it holds</th></tr></thead>
                    <tbody>
                      <tr><td><strong>Normalized Field Name</strong></td><td>Doofinder's standard name, e.g. <code>id</code>, <code>title</code>, <code>price</code></td></tr>
                      <tr><td><strong>Field Aliases</strong></td><td>The name(s) used in the feed itself, e.g. <code>product_id</code>, <code>name</code>, <code>base_price</code></td></tr>
                    </tbody>
                  </table>
                  <figure class="lesson-figure lesson-figure-right" style="width: 230px; max-width: 55%;">
                  <img src="img/field-name-mapping-popup.png" alt="Field name mapping pop-up, with a Normalized Field Name column (availability, brand, categories, description, group_id, gtin) next to a Field Aliases column listing the matching feed field names in several languages" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
                  <p>For example, if a field in the feed is called <code>sku</code>, mapping it as an alias of the normalized field <code>gtin</code> makes Doofinder process that field as <code>gtin</code>.</p>
                  <p>The image on the right shows the pop-up in practice: each Normalized Field Name, such as <code>availability</code>, <code>brand</code> or <code>gtin</code>, has its own row, with its Field Aliases listed beside it — <code>sku</code> is already there as an alias of <code>gtin</code>, alongside <code>g:gtin</code> and <code>ean</code>.</p>

              <h3>Basic and Deep Mapping</h3>
              <table class="theory-table">
                <thead><tr><th>Type</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><strong>Basic mapping</strong></td><td>A simple 1:1 rename, e.g. <code>product_id → id</code> or <code>name → title</code></td></tr>
                  <tr><td><strong>Deep mapping</strong></td><td>Goes a step further, pulling a nested value out of an object or array and exposing it as a first-level field — this will be covered in more detail later in the course</td></tr>
                </tbody>
              </table>

              <h3>Why It Matters</h3>
              <p>A few reasons this matters:</p>
              <ul>
                <li><code>id</code> and <code>title</code> must always be mapped, or indexing fails with <em>"id attribute(s) missing"</em>;</li>
                <li>after deep mapping and re-indexing, only the mapped nested values survive;</li>
                <li>mapping <code>image_link</code>, <code>price</code>, <code>sale_price</code> and <code>link</code> lets the Search Layer display them — missing data there usually just means one of these needs an alias.</li>
              </ul>`
          }
        ]
      },
      quiz: [
        {
          q: "What are the only two mandatory fields in a Product Data Feed?",
          options: ["price and category", "id and title", "link and image_link", "gtin and condition"],
          correct: 1,
          explain: "Every product needs at least a unique id and a title."
        },
        {
          q: "What happens if two items in the same feed share the same id?",
          options: [
            "Both get indexed side by side",
            "<strong>Doofinder</strong> merges their fields automatically",
            "The feed indexing fails entirely",
            "Only one survives — the one processed last overwrites the other"
          ],
          correct: 3,
          explain: "When two items share the same id, only one survives indexing — the one processed last overwrites the other."
        },
        {
          q: "Can a single product's data be spread across two different feeds?",
          options: ["No — it must all be in the same feed", "Yes, always", "Only for variants", "Only via the API"],
          correct: 0,
          explain: "All of a product's information needs to live within the same feed."
        },
        {
          q: "Which file formats can a file- or URL-based data feed use?",
          options: [".txt, .xml or .csv", ".doc or .pdf only", ".png or .jpg only", ".html only"],
          correct: 0,
          explain: "A file or URL feed can be .txt, .xml or .csv, optionally compressed."
        },
        {
          q: "Why choose the API over a file/URL feed?",
          options: [
            "It's the only method <strong>Doofinder</strong> supports",
            "It's required for Google Shopping feeds",
            "It supports real-time updates for fast-changing catalogues",
            "It doesn't need a unique ID per product"
          ],
          correct: 2,
          explain: "The API is the best fit when a once-a-day refresh isn't enough for a fast-changing catalogue."
        },
        {
          q: "Does an existing Google Shopping feed need to be reformatted to be used with <strong>Doofinder</strong>?",
          options: [
            "Yes, it must be converted first",
            "No, <strong>Doofinder</strong> accepts it as-is",
            "Only the images need converting",
            "Only if it's compressed"
          ],
          correct: 1,
          explain: "<strong>Doofinder</strong> accepts a ready-made Google Shopping feed without any reformatting."
        },
        {
          q: "In the mapping UI, what does 'Field Aliases' represent?",
          options: [
            "<strong>Doofinder</strong>'s standard field names",
            "A list of blocked IPs",
            "The name(s) used for that field in the feed itself",
            "Alternative currencies"
          ],
          correct: 2,
          explain: "Field Aliases are the source names from the feed that map onto a Normalized Field Name."
        },
        {
          q: "What does basic mapping do?",
          options: [
            "A simple 1:1 rename between a feed field and a normalized field",
            "Deletes fields that aren't recognised",
            "Merges two Search Engines together",
            "Compresses the feed file"
          ],
          correct: 0,
          explain: "Basic mapping is a straightforward 1:1 rename, e.g. product_id → id or name → title."
        },
        {
          q: "A feed uses <code>sku</code> and has no <code>id</code> field. What should be done?",
          options: [
            "Nothing, <strong>Doofinder</strong> guesses it automatically",
            "Create a separate Search Engine for that field",
            "Rename the feed's own field to id manually",
            "Map the normalized field id with sku as its alias"
          ],
          correct: 3,
          explain: "Adding sku as an alias of the normalized field id makes <strong>Doofinder</strong> process that field as id."
        }
      ]
    },
    {
      id: 6,
      code: "6",
      moduleTag: "Module 1 Section 1",
      navGroup: "SECURITY SETTINGS",
      navLabel: "Security Settings",
      eyebrow: "6. SECURITY SETTINGS",
      title: "Security Settings",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/managing-data/security-settings",
      theory: {
        lead: "<strong>Doofinder</strong> offers two independent ways to control who can reach a Store:",
        blocks: [
          {
            html: `
              <ul>
                <li>an <strong>allowlist</strong> of domains that are trusted to query it from the browser</li>
                <li>a <strong>blocklist</strong> of specific IPs that are denied outright</li>
              </ul>
              <p>By default only allowlisted, or 'authorized', domains can query the Store client-side, while unwanted IPs can be shut out at the network level.</p>

              <h3>Authorized Domains</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 420px; max-width: 55%;">
                  <img src="img/security-settings-tab.png" alt="Store General settings Security tab, showing the Enable CORS toggle, the Authorized domains list with two entries, and an empty Blocked IPs list" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p><strong>Authorized Domains</strong> is Doofinder's CORS-based allowlist. The Store's main domain is enabled automatically, and so is <code>*.doofinder.com</code>, which keeps the Admin Panel itself working.</p>
                  <p>So, if the same Store is meant to be used on other domains too, those need to be authorized as well. For example, a Store created for <code>mysafeshop.com</code> that should also work on <code>mysafeshop.it</code> needs <code>mysafeshop.it</code> added to its Authorized Domains.</p>

              <h3>Wildcards</h3>
              <p>Beyond that, the list supports wildcards with a few levels of precision: <code>*.mysafeshop.com</code> matches a single subdomain level, such as <code>www</code> or <code>blog</code>, <code>*.*.mysafeshop.com</code> matches two nested levels, and <code>**.mysafeshop.com</code> matches any number of nested subdomains at once.</p>
              <table class="theory-table">
                <thead><tr><th>Pattern</th><th>Levels</th><th>Matches</th><th>Doesn't match</th></tr></thead>
                <tbody>
                  <tr><td><code>*.mysafeshop.com</code></td><td>One level</td><td><code>www.mysafeshop.com</code>, <code>blog.mysafeshop.com</code></td><td><code>www.eu.mysafeshop.com</code></td></tr>
                  <tr><td><code>*.*.mysafeshop.com</code></td><td>Exactly two nested levels</td><td><code>www.eu.mysafeshop.com</code></td><td><code>www.mysafeshop.com</code> or <code>www.eu.west.mysafeshop.com</code></td></tr>
                  <tr><td><code>**.mysafeshop.com</code></td><td>Any number of nested levels</td><td><code>www.mysafeshop.com</code>, <code>www.eu.mysafeshop.com</code>, <code>a.b.c.mysafeshop.com</code></td><td>—</td></tr>
                </tbody>
              </table>

              <h3>Local Development and Errors</h3>
              <p>For local development, <code>localhost</code> or <code>127.0.0.1</code> is added without a port number — writing <code>localhost:8080</code> won't work, since Doofinder ignores the port entirely.</p>
              <p class="theory-callout">When a domain isn't authorized, the browser console shows an error along the lines of <em>"forbidden connection from www.example.com for…"</em>, and that's the first thing worth checking whenever a Layer works fine in the admin preview but not on the live site.</p>

              <h3>Blocked IPs</h3>
              <p>The <strong>Blocked IPs</strong> list is where bot traffic gets shut out. Specific IPs or entire ranges can be blocked, using CIDR notation, to stop bot attacks or other unwanted usage.</p>
              <table class="theory-table">
                <thead><tr><th>Entry</th><th>What it blocks</th></tr></thead>
                <tbody>
                  <tr><td><code>203.0.113.42</code></td><td>That exact single IP</td></tr>
                  <tr><td><code>203.0.113.0/24</code></td><td>The entire range from <code>203.0.113.0</code> to <code>203.0.113.255</code> (256 IPs), useful when unwanted traffic comes from a whole subnet rather than one address</td></tr>
                </tbody>
              </table>
              <p>The number after the <code>/</code> is the prefix length: <code>/32</code> blocks a single IP, <code>/24</code> blocks 256 IPs, <code>/16</code> blocks 65,536 IPs — the lower the number, the wider the range.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What are the two independent ways <strong>Doofinder</strong> gives you to control who can reach your Store?",
          options: [
            "An allowlist of trusted domains and a blocklist of denied IPs",
            "A username and a password",
            "A firewall and a VPN",
            "An API key and a secret token"
          ],
          correct: 0,
          explain: "<strong>Doofinder</strong> offers two independent controls at the Store level: an allowlist of domains and a blocklist of IPs."
        },
        {
          q: "Which domains are authorized automatically, without needing to add them?",
          options: ["Any .com domain", "Your main domain and *.doofinder.com", "Only localhost", "No domain is automatic"],
          correct: 1,
          explain: "Your main domain and *.doofinder.com (so the Admin Panel keeps working) are authorized automatically."
        },
        {
          q: "If the same Store should also work on another domain, what needs to be done?",
          options: [
            "Nothing, any domain can query the Store by default",
            "That domain must be added to Authorized Domains",
            "A new Store must be created for it",
            "The Store ID must be regenerated"
          ],
          correct: 1,
          explain: "Only authorized domains can query a Store client-side, so any additional domain has to be added to Authorized Domains first."
        },
        {
          q: "How should localhost be added for local testing?",
          options: [
            "As localhost:3000",
            "You can't test locally",
            "As http://localhost only",
            "As localhost, without any port number"
          ],
          correct: 3,
          explain: "Add localhost or 127.0.0.1 without a port — <strong>Doofinder</strong> ignores the port entirely."
        },
        {
          q: "Which wildcard pattern would match a.b.c.mysafeshop.com?",
          options: [
            "*.mysafeshop.com",
            "*.*.mysafeshop.com",
            "**.mysafeshop.com",
            "mysafeshop.com"
          ],
          correct: 2,
          explain: "** matches any number of nested subdomain levels, while * matches one level at a time and *.*. matches exactly two."
        },
        {
          q: "How many IPs does 203.0.113.0/24 block?",
          options: ["Just one IP", "It's invalid CIDR notation", "65,536 IPs", "256 IPs"],
          correct: 3,
          explain: "A /24 prefix blocks 256 IPs, from 203.0.113.0 to 203.0.113.255. A /32 would block just one IP, and a /16 would block 65,536."
        }
      ]
    },
    {
      id: 7,
      code: "7",
      moduleTag: "Final Exercise",
      sideLabel: "FINAL EXERCISE",
      navGroup: "CONNECTING THE SEARCH LAYER TO THE DEMO STORE",
      navLabel: "Connecting the Search Layer to the demo store",
      eyebrow: "7. CONNECTING THE SEARCH LAYER TO THE DEMO STORE",
      title: "Connecting the Search Layer to the Demo Store",
      hasQuiz: true,
      quizLabel: "Guided Exercise",
      exerciseType: "wizard",
      theory: {
        lead: "Time to put everything you've learned into practice! This final exercise brings the Search Layer fully online on Doostride's demo store. These are the steps you'll need to follow:",
        blocks: [
          {
            html: `
              <ul>
                <li>Identify the domain's structure to decide how many <strong>Stores</strong> and <strong>Search Engines</strong> you need.</li>
                <li>Create the Store(s) and the Search Engine(s).</li>
                <li>Upload the most suitable data feed(s).</li>
                <li>Identify the correct CSS selectors to trigger the Search Layer on the demo.</li>
                <li>Fix the errors.</li>
              </ul>
              <p>Work through each step the same way you would in the real Doofinder Admin Panel — that will help you choose the right answers, and you'll actually need to do them for real to finalize all the steps of the exercise.</p>`
          }
        ]
      },
      exercise: {
        lead: "Now you have the knowledge to put the Search Layer on the demo page. Work through the steps below the same way you would in the real Doofinder Admin Panel.",
        doneNote: "Doostride is live in English and Spanish, and the local demo store can finally reach it.",
        replyButtonLabel: "Reply to John",
        phases: [
          {
            key: "structure",
            title: "1. Identify the <strong>structure</strong>",
            question: "Analyze the demo store's <strong>structure</strong> and work out how many <strong>Stores</strong> and <strong>Search Engines</strong> you need to make the catalogue work correctly, using a <strong>single installation script</strong>.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Choose one of the following answers:",
            fields: [
              { key: "structure", label: "", type: "choice", layout: "column", options: [
                "1 Store & 1 Search Engine — a single Store and a single Search Engine handle both storefronts together",
                "1 Store & 2 Search Engines — one Store for the whole site, with a separate Search Engine for each language",
                "2 Stores & 1 Search Engine — a separate Store for each language, sharing one Search Engine between them",
                "2 Stores & 2 Search Engines — a separate Store and a separate Search Engine for each language"
              ], correct: "1 Store & 2 Search Engines — one Store for the whole site, with a separate Search Engine for each language" }
            ],
            explain: "A Store maps to a website, not a language — Doostride is a single site, so one Store covers it. The site has two language versions, English and Spanish, and in both prices are shown in Euro (€). Since each Search Engine has its own language, English and Spanish each need their own Search Engine under that one Store."
          },
          {
            key: "data-feed",
            title: "2. Choose the most suitable data feed for the English Search Engine",
            question: "Now that you have the page's structure for <strong>Doofinder</strong>'s configuration in mind, let's start by creating the <strong>Store</strong> and the <strong>Search Engine</strong> for the English storefront.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Before doing that, you searched for the data feeds you could use to upload the English catalogue, and found these 3 data feeds:",
            beforeFields: `
              <div class="feed-preview-grid">
                <div class="feed-preview-card">
                  <p class="feed-preview-label">Data feed 1</p>
                  <img src="img/feed1-preview.png" alt="Preview of data feed 1: rows of data starting immediately, with no header row naming the columns" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-en-feed.csv" download class="btn btn-ghost feed-download-btn">Download data feed 1</a>
                </div>
                <div class="feed-preview-card">
                  <p class="feed-preview-label">Data feed 2</p>
                  <img src="img/feed2-preview.png" alt="Preview of data feed 2: a header row naming id, title, link, image_link, price and sale_price" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-en-feed-2.csv" download class="btn btn-ghost feed-download-btn">Download data feed 2</a>
                </div>
                <div class="feed-preview-card">
                  <p class="feed-preview-label">Data feed 3</p>
                  <img src="img/feed3-preview.png" alt="Preview of data feed 3: a header row naming id, title, image_link, price, sale_price and brand — with no link column" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-en-feed-3.csv" download class="btn btn-ghost feed-download-btn">Download data feed 3</a>
                </div>
              </div>
              <p class="theory-lead" style="margin-bottom:16px;">Download and analyze the 3 data feeds, then find the most suitable one for the English Search Engine. Which one is it? Choose one of the following answers:</p>`,
            fields: [
              { key: "validfeed", label: "", type: "choice", layout: "column", options: ["Data feed 1", "Data feed 2", "Data feed 3"], correct: "Data feed 2" }
            ],
            explain: "Data feed 2 is the most suitable one: it has a header row with the field names, includes the mandatory id and title fields (which data feeds 2 and 3 both have), and also includes link, a strongly recommended field. Data feed 1 has no header row at all, so <strong>Doofinder</strong> has no way to know which column is which. Data feed 3 has a header and would index, but it's missing link — without it, selecting a product in the Search Layer wouldn't redirect to that product's page."
          },
          {
            key: "store-en",
            title: "3. Create the Store & set the Search Engine for the English storefront",
            question: "Set up Doostride's <strong>Store</strong> and its first <strong>Search Engine</strong>, for the English storefront. The Doostride site used in this exercise is a <strong>local store</strong> — a demo copy of the site running locally, not published online — and it runs on a <strong>custom-built platform</strong>. Keep both things in mind.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Also keep in mind that, on the <strong>mobile version</strong>, you want the Search Layer to trigger by clicking the <strong>magnifying glass icon</strong>, not by clicking the page's search box.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Choose the right configuration for each of the following:",
            fields: [
              { key: "platform", label: "Which platform does Doostride run on?", type: "select", options: ["Shopify", "WooCommerce", "Magento", "PrestaShop", "Other"], correct: "Other" },
              { key: "industry", label: "Which industry best describes Doostride?", type: "select", options: ["Electronics", "Fashion", "Home & Garden", "Food & Beverage", "Other"], correct: "Fashion" },
              { key: "language", label: "Which language is this Search Engine for?", type: "select", options: ["English", "Spanish", "French", "German", "Italian"], correct: "English" },
              { key: "currency", label: "Which currency are prices shown in?", type: "select", options: ["British Pound (£)", "Euro (€)", "Japanese Yen (¥)", "Swiss Franc (CHF)", "US Dollar ($)"], correct: "Euro (€)" },
              { key: "css", label: "Choose the CSS selector that triggers the Search Layer on both desktop and mobile", type: "select", options: ["#doostride-search", ".search-wrap, .icon-btn", "#doostride-search, .icon-btn.search-toggle-btn", ".icon-btn", "#df-results-mount", ".header-actions", "#doostride-search, .search-toggle-btn"], correct: "#doostride-search, .icon-btn.search-toggle-btn" }
            ],
            explain: "Doostride is a custom-built site, so Platform is 'Other'. It's a footwear & streetwear store, and there's no dedicated 'Footwear' option, so the closest Industry is 'Fashion'. The language and currency configure this specific Search Engine — English results, priced in Euro (€). For the CSS selector, using only #doostride-search would have worked on desktop, but on mobile that element is hidden — the trigger would target the page's hidden search box instead of the visible magnifying glass icon, so clicking it would do nothing. Both elements need to be targeted: #doostride-search, .icon-btn.search-toggle-btn."
          },
          {
            key: "search-es",
            title: "4. Create the Search Engine for the Spanish Storefront",
            question: `<p class="theory-lead" style="margin-bottom:16px;">Now that the <strong>Store</strong> and the <strong>Search Engine</strong> for the English storefront are configured, it's time to configure a Search Engine for the Spanish storefront.</p>
              <p class="theory-lead" style="margin-bottom:16px;">For the Spanish storefront, you found only one data feed in Spanish, so that's the one to use — it can be downloaded below.</p>`,
            scenario: "To complete this step, choose the right configuration for each of the following:",
            scenarioFeed: { label: "Spanish data feed", src: "img/feed-es-preview.png", alt: "Preview of the Spanish data feed", href: "feeds/doofinder-es-feed.csv", downloadLabel: "Download the Spanish feed" },
            smallMedia: true,
            fieldsRow: true,
            fields: [
              { key: "language", label: "Which language is this Search Engine for?", type: "select", options: ["English", "Spanish", "French", "German", "Italian"], correct: "Spanish" },
              { key: "currency", label: "Which currency are prices shown in?", type: "select", options: ["British Pound (£)", "Euro (€)", "Japanese Yen (¥)", "Swiss Franc (CHF)", "US Dollar ($)"], correct: "Euro (€)" }
            ],
            explain: "This Search Engine is being created for the Spanish storefront, so Language is set to Spanish. As covered in step 1, both language versions of Doostride price their products in Euro (€), so Currency stays Euro (€) here too — only the language changes between the two Search Engines."
          },
          {
            key: "store-ids",
            title: "5. Create the Store and Search Engines, and save their IDs",
            question: `Now try to create the <strong>Store</strong> and both <strong>Search Engines</strong> yourself, from your Doofinder Admin Panel.</p>
              <figure class="lesson-figure lesson-figure-left" style="width: 360px; max-width: 55%;">
                <img src="img/store-url-field.png" alt="Store form field 'What's your store's URL?' filled in with https://www.doofinder.com/ and a green check mark, with the hint 'Add the full address of your website'" data-action="zoom-image">
                <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
              </figure>
              <p class="theory-lead" style="margin-bottom:16px;">When the Store form asks <strong>"What's your store's URL?"</strong>, enter <strong>https://www.doofinder.com/</strong>: the Doostride demo store is a local store, and a local URL can't be entered in that field.</p>
              <div style="clear: both;"></div>
              <p class="theory-lead" style="margin-bottom:16px;">Here are the data feeds:</p>
              <div class="feed-preview-grid">
                <div class="feed-preview-card">
                  <p class="feed-preview-label">English data feed</p>
                  <img src="img/feed2-preview.png" alt="Preview of data feed 2: a header row naming id, title, link, image_link, price and sale_price" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-en-feed-2.csv" download class="btn btn-ghost feed-download-btn">Download the English feed</a>
                </div>
                <div class="feed-preview-card">
                  <p class="feed-preview-label">Spanish data feed</p>
                  <img src="img/feed-es-preview.png" alt="Preview of the Spanish data feed" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doofinder-es-feed.csv" download class="btn btn-ghost feed-download-btn">Download the Spanish feed</a>
                </div>
              </div>
              <p class="theory-lead" style="margin-bottom:16px;">And this is the CSS selector: <code>#doostride-search, .icon-btn.search-toggle-btn</code></p>
              <p class="theory-lead" style="margin-bottom:16px;">Then paste the <strong>Store ID</strong> and the two <strong>Hash IDs</strong> you just created below. Once you've completed this step, this script:</p>
              <pre class="code-block"><code>&lt;script src="https://eu1-config.doofinder.com/2.x/<span class="tok live-store-id">STORE_ID</span>.js" async&gt;&lt;/script&gt;</code></pre>
              <p class="theory-lead" style="margin-bottom:16px;">will be integrated automatically into the demo store.</p>`,
            afterFields: `<p class="theory-lead" style="margin-top:16px;">Then, if you try to use the Search Layer on the demo store, it won't work — there are a couple of errors you'll need to fix.</p>`,
            fields: [
              { key: "storeId", label: "Store ID", type: "text", freeform: true },
              { key: "hashEN", label: "Search Engine for English Storefront — Hash ID", type: "text", freeform: true },
              { key: "hashES", label: "Search Engine for Spanish Storefront — Hash ID", type: "text", freeform: true }
            ]
          },
          {
            key: "allowdomain",
            title: "6. Fix the Forbidden Domain Error",
            scenario: "Convinced you've correctly installed the Doofinder script and set up everything needed to trigger the Search Layer on the storefronts, you try out the tool — for now, only on the <strong>English storefront</strong>.</p><p class=\"exercise-scenario-text\">But clicking the search box, the Search Layer doesn't work. You open the browser console and see this error:</p><p class=\"exercise-scenario-text\">Choose one of the following options to fix the error:",
            scenarioImage: { src: "img/forbidden-domain-console-error.png", alt: "Browser DevTools console showing a Doofinder error: Forbidden connection from localhost for hashid b80080205068d7aec31e931e976d6988", imgClass: "taller-scenario-img" },
            mediumMedia: true,
            mediaRight: true,
            fields: [
              { key: "domain", label: "", type: "choice", layout: "column", options: [
                "Regenerate the Search Engine's Hash ID",
                "Add localhost to Authorized Domains",
                "Re-upload the data feed",
                "Change the CSS selector that triggers the Search Layer"
              ], correct: "Add localhost to Authorized Domains" }
            ],
            explain: "Lesson 6 covers this: for local testing, add localhost (or 127.0.0.1) to Authorized Domains — without a port number, since Doofinder ignores it entirely. The error is specifically about which domains are allowed to connect, so it has nothing to do with the Search Engine's credentials, the catalogue data, or how the Search Layer is triggered on the page — regenerating the Hash ID, re-uploading the feed, and changing the CSS selector would all leave the Forbidden connection error untouched."
          },
          {
            key: "field-mapping",
            title: "7. Fix the Error in the Spanish data feed — Part 1",
            question: "After fixing the <strong>Authorized Domains</strong> error, you try the Spanish storefront too: the Search Layer opens, but it doesn't return any results.",
            scenario: "Access the <strong>Spanish Search Engine</strong> and, on the <strong>Indices</strong> tab, you'll see an error related to the data feed's upload:</p><p class=\"exercise-scenario-text\">So, since there are no products loaded, the Search Layer can't work.</p><p class=\"exercise-scenario-text\">Find out why you're getting this error, and choose one of the following answers:",
            scenarioImage: { src: "img/field-name-mapping-error-indices.png", alt: "Indices screen showing the warning about a missing id attribute and the Field name mapping option in the source's menu", imgClass: "taller-scenario-img" },
            mediumMedia: true,
            fields: [
              { key: "what", label: "", type: "choice", layout: "column", options: ["It's missing one of the mandatory fields, and needs a Field Name Mapping", "It's missing one of the mandatory fields, and needs a new data feed", "It has all mandatory fields — no fix is needed", "The CSS selector needs to be changed"], correct: "It's missing one of the mandatory fields, and needs a Field Name Mapping" }
            ],
            explain: "This is straight out of Lesson 5: the feed is missing the mandatory id field — but it does have a column, product_code_identification, with the right characteristics to be used as one (a unique value per product). The fix is a Field Name Mapping (Configuration > Search Engines > See indices > Product tab > ⋮ next to the source > Field name mapping), setting Normalized Field Name to id and Field Alias to product_code_identification."
          },
          {
            key: "mapping-image",
            title: "7. Fix the Error in the Spanish data feed — Part 2",
            question: "In the image from the previous step, you'll have noticed the <strong>Field name mapping</strong> tab. Opening that section lets you configure the correct mapping so the data feed uploads properly.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze these 3 images, each showing a different mapping, and choose one of the following answers:",
            fields: [
              { key: "correctmapping", type: "image-select", layout: "column", options: [
                { value: "correct", src: "img/field-mapping-correct.png", alt: "Field name mapping panel with product_code_identification added as an alias under the id row", caption: "Option A" },
                { value: "missing-id", src: "img/field-mapping-missing-id.png", alt: "Field name mapping panel with no id row at all", caption: "Option B" },
                { value: "inverted", src: "img/field-mapping-inverted.png", alt: "Field name mapping panel with product_code_identification as the Normalized Field Name and id as the Field Alias, the wrong way round", caption: "Option C" }
              ], correct: "correct" }
            ],
            explain: "Option A is correct: product_code_identification was added as a Field Alias under the id Normalized Field Name. Option B is missing the id row entirely, so id still wouldn't be mapped and indexing would fail. Option C has it backwards — id was typed in as the Field Alias instead of the Normalized Field Name, so the mapping still doesn't tell Doofinder that product_code_identification means id."
          }
        ],
        replyEmail: {
          name: "Mark Park",
          address: "To: john.river@doostride.com",
          cc: "Amanda House",
          subject: "Re: Trying out <strong>Doofinder</strong>'s Search Layer on our site",
          body: [
            "Hi John, Hi Amanda,",
            "Good news — the Search Layer is up and running on our local test copy of the site.",
            "It's live on both language versions, <strong>English</strong> and <strong>Spanish</strong>, and it works on mobile as well as desktop.",
            "On the Doofinder side, I set up one Store with two Search Engines — one for the English site and one for the Spanish site, both with prices in euros — each one loading its own catalogue data feed.",
            "Happy to walk you through it whenever works for you.",
            "Best,<br>Mark"
          ]
        }
      }
    }
  ]
};
