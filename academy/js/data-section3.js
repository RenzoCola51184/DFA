/* Doofinder Academy — Module 1 Section 3 content
   Summaries condensed from support.doofinder.com. Section 0 is a recap of
   Module 1 Section 2 and section 1 is this section's introduction — neither
   has a quiz. Sections 2-7 each have a theory block and a quiz. Section 8 is
   the final exercise, still to be designed. */

const COURSE = {
  storageKey: "dfa_progress_section3_v1",
  sections: [
    {
      id: 0,
      code: "0",
      moduleTag: "Module 1 Section 3",
      navGroup: "RECAP",
      navLabel: "Recap: Section 2",
      eyebrow: "0. RECAP",
      title: "Recap: Module 1 Section 2",
      hasQuiz: false,
      pages: [
        {
          intro: [
            "Before diving into <strong>Section 3</strong>, here's a quick recap of what <strong>Section 2</strong> of this module covered:"
          ],
          schema: `
            <div class="theory-block">
              <ul>
                <li><strong>Introduction</strong> — got oriented on how <strong>Doofinder</strong>'s Search Layer decides and orders what a shopper sees, from the mechanics behind a match to the tools that shape and promote results.</li>
                <li><strong>How Doofinder Search Works</strong> — clicking the search box opens a connection to the Search Layer, and every keystroke calls Doofinder's search API against the related Search Engine; result quality then comes down to the data feed's content and the Search Engine's own configuration (Search Fields, Relevance Criteria, Boosting, Custom Results, Excluded Results).</li>
                <li><strong>Results Preview</strong> — testing Doofinder's response to a query live, Score as the multiplication of Relevance and Boosting, and the four query types (match_and, match_or, fuzzy, match_all) with their fallback order.</li>
                <li><strong>Search Fields</strong> — which parts of a product's data get searched and how much weight each carries, plus special field types like <code>df_all</code>, <code>light_explode</code> and <code>autocomplete</code> fields.</li>
                <li><strong>Relevance Criteria</strong> — tie-breaking sort rules beyond Score, up to five fields deep, with Score always required to stay first.</li>
                <li><strong>Boosting</strong> — four ways to change a product's relevance: Boosting Rules, Manual Boosting, Automatic Boosting, and Boosting Through Data Feed via <code>df_manual_boost</code>.</li>
                <li><strong>Custom Results</strong> — including or excluding specific items for specific search terms, and how that ties into the Search Layer's initial and no-results views.</li>
              </ul>
            </div>`
        }
      ]
    },
    {
      id: 1,
      code: "1",
      moduleTag: "Module 1 Section 3",
      sideLabel: "MODULE 1 SECTION 3",
      navGroup: "INTRODUCTION",
      navLabel: "Introduction",
      eyebrow: "1. INTRODUCTION",
      title: "Introduction",
      hasQuiz: false,
      pages: [
        {
          intro: [
            "This section's introduction is still being written.",
            "In the meantime, you can browse <strong>Doofinder</strong>'s support documentation directly at <a href=\"https://support.doofinder.com\" target=\"_blank\" rel=\"noopener\">support.doofinder.com</a>."
          ]
        }
      ]
    },
    {
      id: 2,
      code: "2",
      moduleTag: "Module 1 Section 3",
      navGroup: "EXCLUDED RESULTS",
      navLabel: "Excluded Results",
      eyebrow: "2. EXCLUDED RESULTS",
      title: "Excluded Results",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/getting-started/excluded-results",
      extraDocs: [
        { label: "Out of Stock Items", url: "https://support.doofinder.com/search/promotional-tools/out-of-stock-items", fromPage: 3 }
      ],
      theory: {
        lead: "In this lesson you'll learn how to make specific items disappear from <strong>Doofinder</strong>'s results entirely — and, briefly, about a ready-made shortcut for one of the most common cases: excluding out-of-stock products automatically.",
        pages: [
          [
            {
              html: `
                <p><strong>Excluded Results</strong> lets you intentionally remove certain items from a Search Engine's results — whether that's a single product or a whole batch of them, picked out with filtering rules. It's configured from the <strong>Admin Panel</strong>, under Configuration → Excluded Results, on the Search Engine you want to affect. Since a Search Engine feeds every <strong>Doofinder</strong> product, excluding an item there affects all of them at once — Search, Recommendations, Quiz Maker, and so on.</p>
                <p>There are two ways to exclude items:</p>
                <ul>
                  <li><strong>By item</strong> — click "+Add results" → "Individual items", type in the product as it's registered in the data feed, select it (more than one can be picked at a time) and click "Add item", then save. Up to 100 items can be excluded this way per Search Engine.</li>
                  <li><strong>By rules</strong> — exclude by a filter instead of naming products one by one. The filter needs to already exist in the product data feed and be configured as a filter, whether or not it's set as visible on the Layer. Pick an attribute from the "Select field" dropdown (e.g. brand), a value from "select value" (e.g. Adidas), then click "Add rule" and save.</li>
                </ul>
                <p>Both approaches can be combined on the same Search Engine — excluding some items individually and others by rule at the same time.</p>`
            }
          ],
          [
            {
              html: `
                <p>Rules can also be combined into conditions:</p>
                <ul>
                  <li>An <strong>AND</strong> condition happens automatically as soon as two filters with different attributes are used together — e.g. category "Shoes" and color "blue" excludes only items that are both.</li>
                  <li>An <strong>OR</strong> condition happens by adding two or more values in the same row — e.g. color "blue" or "red" in the same rule excludes items matching either one.</li>
                  <li>Both can be combined at once: excluding every item in category "Shoes" whose color is "blue" or "red" mixes an AND (category + color) with an OR (blue vs red) in the same rule.</li>
                </ul>`
            }
          ],
          [
            {
              heading: "Out of Stock Items",
              html: `
                <p>Excluding out-of-stock products is such a common need that <strong>Doofinder</strong> ships a dedicated, automated shortcut for it, instead of having to build and maintain an exclusion rule by hand. It requires the data feed to already carry an <strong>availability</strong> field, with an "out of stock" value set on the relevant items.</p>
                <p>Turning it on takes three steps, all from Configuration → Excluded Results: click "Add results" → "Rules", pick <code>availability</code> as the field and <code>out of stock</code> as its value, click "Add rule", then <strong>Save</strong>.</p>
                <p>From then on it runs automatically: the moment a product's availability flips to "out of stock" in the feed, it disappears from results — and once it's back in stock, it reappears too, though only after the feed is <strong>reindexed</strong>. Like any other Excluded Results rule, it affects every <strong>Doofinder</strong> service fed by that Search Engine — Search, Recommendations, Quiz Maker, and the rest.</p>`
            }
          ]
        ]
      },
      quiz: [
        {
          q: "What does Excluded Results let you do?",
          options: [
            "Intentionally remove specific items from a Search Engine's results",
            "Hide a Search Engine's error messages",
            "Change the currency of a Search Engine",
            "Rename a Store's domain"
          ],
          correct: 0,
          explain: "Excluded Results lets you remove certain items from a Search Engine's results, either individually or in batches picked out by rules."
        },
        {
          q: "Where is Excluded Results configured?",
          options: [
            "Admin Panel > Configuration > Excluded Results",
            "Admin Panel > Search > Layer Settings",
            "Admin Panel > Managing Data > Field Name Mapping",
            "It can only be set from the data feed itself"
          ],
          correct: 0,
          explain: "It's configured from the Admin Panel, under Configuration > Excluded Results, on the Search Engine you want to affect."
        },
        {
          q: "Which <strong>Doofinder</strong> services are affected when an item is excluded from a Search Engine?",
          options: [
            "Only the Search Layer",
            "Only Recommendations",
            "Search, Recommendations, Quiz Maker and the other services fed by that Search Engine",
            "None — exclusion only affects the Admin Panel's own reports"
          ],
          correct: 2,
          explain: "Since a Search Engine feeds every <strong>Doofinder</strong> product, excluding an item there affects all of them at once."
        },
        {
          q: "What's the maximum number of items that can be excluded individually per Search Engine?",
          options: ["10", "100", "1,000", "There's no limit"],
          correct: 1,
          explain: "Up to 100 items can be excluded individually per Search Engine."
        },
        {
          q: "What must be true of a filter used to exclude results by rule?",
          options: [
            "It must already exist in the product data feed and be configured as a filter",
            "It must be set as visible on the Layer",
            "It must be a numeric field only",
            "It must first be added to Excluded Results as an individual item"
          ],
          correct: 0,
          explain: "The filter needs to already exist in the product data feed and be configured as a filter — it doesn't matter whether it's set as visible on the Layer or not."
        },
        {
          q: "Two filters with different attributes are added to the same exclusion rule. What condition is created?",
          options: ["An OR condition", "An AND condition", "Neither is applied", "A conflict error"],
          correct: 1,
          explain: "Using two filters with different attributes automatically generates an AND condition."
        },
        {
          q: "Two values are added to the same row of an exclusion rule. What condition is created?",
          options: ["An AND condition", "An OR condition", "Both are ignored", "A duplicate error"],
          correct: 1,
          explain: "Adding two or more values in the same row generates an OR condition."
        },
        {
          q: "What does <strong>Doofinder</strong>'s automated Out of Stock Items tool require the data feed to already have?",
          options: [
            "An availability field, with an \"out of stock\" value set on the relevant items",
            "A df_manual_boost field",
            "A Field Name Mapping for id",
            "A Redirection pointing to the product page"
          ],
          correct: 0,
          explain: "The automated Out of Stock exclusion rule needs the feed to already carry an availability field, with \"out of stock\" set on the items that should be hidden."
        },
        {
          q: "Once a product is back in stock, when does it reappear in search results?",
          options: [
            "Immediately, with no further action needed",
            "Only after the feed is reindexed",
            "Only if it's manually re-added as an individual item",
            "It never reappears automatically"
          ],
          correct: 1,
          explain: "The availability value updates in the feed, but the product only reappears in results once that feed is reindexed."
        }
      ]
    },
    {
      id: 3,
      code: "3",
      moduleTag: "Module 1 Section 3",
      navGroup: "GROUPING PRODUCT VARIANTS",
      navLabel: "Grouping Product Variants",
      eyebrow: "3. GROUPING PRODUCT VARIANTS",
      title: "Grouping Product Variants",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/managing-data/grouping-product-variants",
      theory: {
        lead: "<strong>Grouping Product Variants</strong> lets a product's different sizes, colors and other variants show up as a single result, with the variant filters still available — instead of the same item appearing over and over as a wall of near-identical products.",
        pages: [
          [
            {
              html: `
                <p>It's turned on from Configuration → Search Engines → See indices → Indices → Configuration section: enable <strong>"Group variants as a single item"</strong>, then click <strong>Save</strong>. For it to actually work, every variant of the same product needs to share the same <code>group_id</code> value in the data feed (a string) — all items with the same <code>group_id</code> get displayed as one product only.</p>
                <p>A second field, <code>group_leader</code> (a boolean — <code>true</code>/<code>false</code>, or the string equivalents), decides which variant represents the group: the one with <code>group_leader</code> set to <strong>true</strong> is the one shown first, while every other variant in that group should be set to <strong>false</strong>. If no variant is marked as the leader, other sort criteria decide which one shows instead.</p>
                <p>Both the group leader and its child variants stay indexed even once grouped: the leader is what appears for a general search, but a search for one specific child's own SKU still returns that exact variant directly.</p>`
            }
          ],
          [
            {
              html: `
                <p>A couple of <strong>Relevance Criteria</strong> tweaks (Search → Advanced Preferences) pair well with grouping: sorting by <code>best_price</code> ascending surfaces the cheapest variant as the group leader, and sorting by <strong>Availability</strong> prioritizes an in-stock variant over an out-of-stock one — combining both keeps the cheapest available option in front.</p>
                <p>Speaking of availability: if hiding out-of-stock items is enabled and every single variant in a group is out of stock, the whole grouped product disappears from results — sorting by Availability is what keeps an in-stock sibling visible above the rest whenever at least one exists.</p>
                <p>A few more things worth knowing: updating a product's <code>group_id</code> changes its grouping right away; the price shown in results is the group leader's own price, not some average or combined figure; a specific child variant can still be hidden on its own with an <strong>Excluded Results</strong> rule, without breaking the rest of the group; and a custom feed that simply never indexes variants as separate items sidesteps all of this grouping logic entirely.</p>`
            }
          ]
        ]
      },
      quiz: [
        {
          q: "What does Grouping Product Variants let you do?",
          options: [
            "Show a product's different variants as a single result, with filters still available",
            "Automatically translate product titles into other languages",
            "Merge two Search Engines into one",
            "Hide every out-of-stock product permanently"
          ],
          correct: 0,
          explain: "Grouping folds a product's variants into a single result in the Search Layer, while keeping the variant filters available."
        },
        {
          q: "Where is variant grouping turned on?",
          options: [
            "Configuration > Search Engines > See indices > Indices > Configuration section",
            "Admin Panel > Managing Data > Security Settings",
            "Search > Promotional Tools > Banners",
            "Directly inside the installation script"
          ],
          correct: 0,
          explain: "It's enabled from Configuration > Search Engines > See indices > Indices > Configuration section, toggling \"Group variants as a single item\"."
        },
        {
          q: "What must every variant of the same product share in the data feed for grouping to work?",
          options: [
            "The same group_id value",
            "The same price",
            "The same image_link",
            "The same title"
          ],
          correct: 0,
          explain: "All items sharing the same group_id value are displayed as a single grouped product."
        },
        {
          q: "What does setting group_leader to true on one variant do?",
          options: [
            "Marks it as the group's representative, shown first",
            "Excludes it from the Search Engine",
            "Doubles its boosting value",
            "Deletes the other variants from the feed"
          ],
          correct: 0,
          explain: "The variant with group_leader set to true becomes the group's representative and is the one shown first — every other variant in that group should be set to false."
        },
        {
          q: "Once products are grouped, what happens if a shopper searches for one specific child variant's own SKU?",
          options: [
            "Nothing is returned, since only the group leader is indexed",
            "That exact child variant is returned directly",
            "The Search Engine throws an indexing error",
            "Only the group leader is ever returned, regardless of the search"
          ],
          correct: 1,
          explain: "Both the group leader and its child variants stay indexed, so searching a specific child SKU still returns that exact variant."
        },
        {
          q: "Sorting a grouped Search Engine by best_price (ascending) in Relevance Criteria does what?",
          options: [
            "Shows the most expensive variant as the group leader",
            "Surfaces the cheapest variant as the group leader",
            "Hides all variants above the average price",
            "Has no effect on grouped products"
          ],
          correct: 1,
          explain: "Sorting by best_price ascending makes the cheapest variant the one shown as the group's leader."
        },
        {
          q: "If every variant in a group is out of stock and hiding out-of-stock items is enabled, what happens?",
          options: [
            "The entire grouped product disappears from results",
            "Only the group leader disappears, children stay visible",
            "The group is automatically un-grouped",
            "Nothing — grouped products are always shown regardless of stock"
          ],
          correct: 0,
          explain: "With every variant out of stock, the whole grouped product disappears from results — sorting by Availability helps keep an in-stock sibling visible whenever at least one exists."
        },
        {
          q: "How can one specific child variant be hidden without breaking the rest of its group?",
          options: [
            "By deleting the group_id field entirely",
            "With an Excluded Results rule targeting that one variant",
            "By setting its price to zero",
            "It can't be done — hiding one variant removes the whole group"
          ],
          correct: 1,
          explain: "An Excluded Results rule can hide one specific child variant on its own, without affecting the rest of the group."
        }
      ]
    },
    {
      id: 4,
      code: "4",
      moduleTag: "Module 1 Section 3",
      navGroup: "SYNONYMS",
      navLabel: "Synonyms",
      eyebrow: "4. SYNONYMS",
      title: "Synonyms",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/optimize/synonyms",
      theory: {
        lead: "A synonym is a word that means the same as another — like 'small' and 'little' — and <strong>Doofinder</strong>'s <strong>Synonyms</strong> feature lets a search for one term also match the others in its set, even when the data feed itself never uses those other words.",
        pages: [
          [
            {
              html: `
                <p>Synonyms live inside the <strong>Admin Panel</strong>, under Search → Optimize → Synonyms, and are configured separately per Store. Each Search Engine can hold up to 1,000 synonyms, and it's worth knowing upfront that using different terms from the same synonym set doesn't guarantee identical results for each one — it depends on how those terms actually show up across the indexed catalogue.</p>
                <p>There are two ways to build a synonym set:</p>
                <ul>
                  <li><strong>AI SynonymBoost</strong> — an algorithm that looks for synonym patterns specific to the Store's configured industry and language, and suggests them automatically. Getting the industry setting right matters here, since a wrong one leads to irrelevant suggestions. Suggestions show up to 10 at a time in a carousel — click the "+" to accept one, or the trash icon to reject it, and once a decision is made new suggestions are generated to replace it, with the newest ones always shown first.</li>
                  <li>manually created synonyms — built by hand instead of accepted from a suggestion.</li>
                </ul>`
            }
          ],
          [
            {
              html: `
                <p>Manually created synonyms come in two types:</p>
                <ul>
                  <li><strong>Synonyms type</strong> — a simple list, written as <code>Synonym1, Synonym2, Synonym3</code>. For it to work, the first term in that list has to be one that actually appears in the indexed feed. For example, with <code>icebox, cooler, fridge</code> (where "icebox" is the feed's own term), searching for any of the three returns the same products.</li>
                  <li><strong>Explicit Replacement type</strong> — written as <code>Term1, Term2 => Term1, Term2</code>, it swaps the original word out for the replacement(s) rather than adding to it. Searching <code>icebox => fridge</code> for "icebox" then returns nothing, since only "fridge" (which has to exist in the feed) actually returns results.</li>
                </ul>
                <p>A couple of quirks to keep in mind: commas are reserved as the separator between terms, so they can't appear inside a synonym itself; and hyphens are always normalized to spaces, since symbols get stripped out during indexing anyway — so a synonym is always saved and matched with spaces, never hyphens.</p>
                <p>Existing synonyms can be copied across to another Search Engine, either merging into its existing settings or replacing them outright — the second option can't be undone, so it's worth being careful with it. Any synonym set can also be toggled off without deleting it, and the whole list can be imported or exported as a <strong>.csv</strong> file (skip the header row on import; each line reads like <code>sneaker, trainer, shoe</code>).</p>
                <p>Under the hood, <strong>Doofinder</strong> re-crawls the product feed at least once a day (or on demand, from Indices), extracting its data into a file called the <strong>Index</strong>. Whenever synonyms are defined, that same indexing pass replaces every occurrence of a synonym with its whole set — which is exactly what lets a single search term surface products that only ever mention one of its synonyms in the feed.</p>`
            }
          ]
        ]
      },
      quiz: [
        {
          q: "What is a synonym, as this lesson defines it?",
          options: [
            "A word that means the same as another word in the same language",
            "A misspelled version of a search term",
            "A field name used in the data feed",
            "A category shared by two products"
          ],
          correct: 0,
          explain: "A synonym is a word that means the same as another — like 'small' and 'little'."
        },
        {
          q: "Where are Synonyms configured?",
          options: [
            "Admin Panel > Search > Optimize > Synonyms",
            "Admin Panel > Configuration > Excluded Results",
            "Admin Panel > Managing Data > Security Settings",
            "Directly inside the data feed file"
          ],
          correct: 0,
          explain: "Synonyms live inside the Admin Panel, under Search > Optimize > Synonyms."
        },
        {
          q: "What's the maximum number of synonyms allowed per Search Engine?",
          options: ["10", "100", "1,000", "Unlimited"],
          correct: 2,
          explain: "Each Search Engine can hold up to 1,000 synonyms."
        },
        {
          q: "Does using different terms from the same synonym set guarantee the same results for each one?",
          options: [
            "Yes, always identical",
            "No — it depends on how those terms show up across the indexed catalogue",
            "Only for Explicit Replacement sets",
            "Only if <strong>Doofinder</strong>'s AI SynonymBoost created the set"
          ],
          correct: 1,
          explain: "Using different terms from a set of synonyms does not guarantee the same search results for each term."
        },
        {
          q: "In a Synonyms-type set (e.g. icebox, cooler, fridge), what must the first term be?",
          options: [
            "The shortest word in the set",
            "A term that actually appears in the indexed feed",
            "A term written in English",
            "It doesn't matter which term comes first"
          ],
          correct: 1,
          explain: "For a Synonyms-type set to work, the first synonym listed must be an attribute that actually appears in the indexed feed."
        },
        {
          q: "In an Explicit Replacement set written as icebox => fridge, what happens when a shopper searches \"icebox\"?",
          options: [
            "It returns the same results as fridge",
            "It returns nothing — only fridge returns results",
            "It returns every product in the catalogue",
            "It triggers a Redirection instead"
          ],
          correct: 1,
          explain: "Explicit Replacement substitutes the original word for the replacement — searching the replaced term returns nothing, only the replacement term works."
        },
        {
          q: "How are hyphens handled when saving a synonym?",
          options: [
            "They're kept exactly as typed",
            "They're always replaced with spaces",
            "They're converted to underscores",
            "They cause the synonym to be rejected"
          ],
          correct: 1,
          explain: "Hyphens are always normalized to spaces — a synonym is saved and matched using spaces, never hyphens."
        },
        {
          q: "When does <strong>Doofinder</strong> actually apply synonym replacements to the catalogue?",
          options: [
            "Immediately, the moment a synonym is saved, with no delay at all",
            "During indexing, when the feed is crawled and stored in the Index",
            "Only when a shopper clicks a Search Suggestion",
            "Only during the AI SynonymBoost carousel review"
          ],
          correct: 1,
          explain: "<strong>Doofinder</strong> crawls the feed during indexing and, at that point, replaces every occurrence of a defined synonym with its whole set inside the Index."
        }
      ]
    },
    {
      id: 5,
      code: "5",
      moduleTag: "Module 1 Section 3",
      navGroup: "REDIRECTIONS",
      navLabel: "Redirections",
      eyebrow: "5. REDIRECTIONS",
      title: "Redirections",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/optimize/redirections",
      theory: {
        lead: "A <strong>Redirection</strong> sends shoppers from the Search Layer straight to a URL of your choosing whenever they search for a specific term — instead of showing them a results page at all.",
        pages: [
          [
            {
              html: `
                <p>A redirection takes a shopper from the <strong>Search Layer</strong> to another page, specified by a URL, the moment they type a given search term. It's a way to surface information that doesn't live in the catalogue itself — a privacy policy, a contact page, a company or blog page, or a campaign landing page tied to a brand or a season (Black Friday, a sale, Christmas, and so on).</p>
                <p>Redirections are set up from the <strong>Admin Panel</strong>, under Search → Optimize → Redirections: pick the Search Engine, then click "Add redirection". A set of redirections can also be copied over to another Search Engine using the "Copy settings to..." dropdown next to that same button, followed by "Apply".</p>
                <p>Creating one means filling in:</p>
                <ul>
                  <li>A <strong>Redirection name</strong>, to identify it later.</li>
                  <li>A <strong>Status</strong> toggle, to enable or disable it.</li>
                  <li>A <strong>Destination URL</strong>, the page it points to.</li>
                  <li>One or more <strong>search terms</strong> that trigger it, each set to either <strong>Exact Match</strong> (only that exact term triggers it) or <strong>Broad Match</strong> (triggers as soon as the typed text contains that term).</li>
                </ul>
                <p>There's also an <strong>"Enable automatic redirection"</strong> checkbox: leave it unchecked and the redirection only fires once the shopper presses enter or actually searches; check it and it happens automatically, as soon as the matching term is typed in.</p>`
            }
          ],
          [
            {
              html: `
                <p>Each Search Engine can hold up to 100 redirections. Once saved, they show up in a list where each one can be activated or deactivated, edited or deleted from its three-dot menu — and the list itself can be searched, or filtered by date or by status, to make finding a specific one easier as the list grows.</p>`
            }
          ]
        ]
      },
      quiz: [
        {
          q: "What does a Redirection do?",
          options: [
            "It sends the shopper to a specific URL when they search for a given term",
            "It removes a product from the results entirely",
            "It renames a search term inside the data feed",
            "It highlights a product with a banner"
          ],
          correct: 0,
          explain: "A redirection takes a shopper from the Search Layer to another page, specified by a URL, when they type a given search term."
        },
        {
          q: "Where are Redirections configured?",
          options: [
            "Admin Panel > Search > Optimize > Redirections",
            "Admin Panel > Configuration > Excluded Results",
            "Admin Panel > Search > Promotional Tools > Banners",
            "Inside the product data feed"
          ],
          correct: 0,
          explain: "Redirections are set up from the Admin Panel, under Search > Optimize > Redirections."
        },
        {
          q: "Which of these is a use case mentioned for Redirections?",
          options: [
            "Pointing a search term to a privacy policy or contact page",
            "Converting a product's currency",
            "Blocking a visitor's IP address",
            "Mapping a feed field to a normalized field name"
          ],
          correct: 0,
          explain: "Redirections are useful for things like a privacy policy, a contact page, or a campaign landing page — information that doesn't live in the catalogue itself."
        },
        {
          q: "What's the difference between Exact Match and Broad Match on a redirection's search terms?",
          options: [
            "Exact Match only triggers on the exact term; Broad Match triggers when the typed text contains it",
            "They behave identically",
            "Broad Match only works on mobile",
            "Exact Match applies to brands, Broad Match to categories"
          ],
          correct: 0,
          explain: "Exact Match only triggers on that exact term, while Broad Match triggers as soon as the typed text contains it."
        },
        {
          q: "What happens if \"Enable automatic redirection\" is left unchecked?",
          options: [
            "The redirection never fires",
            "The redirection only fires once the shopper presses enter or actually searches",
            "The redirection fires on every keystroke",
            "The redirection is disabled entirely until re-saved"
          ],
          correct: 1,
          explain: "Left unchecked, the redirection only fires once the shopper presses enter or searches; checked, it fires automatically as the matching term is typed."
        },
        {
          q: "How many redirections can a single Search Engine hold?",
          options: ["10", "100", "1,000", "Unlimited"],
          correct: 1,
          explain: "Each Search Engine can hold up to 100 redirections."
        },
        {
          q: "How can a set of redirections be applied to a different Search Engine?",
          options: [
            "By re-typing them manually on the other Search Engine",
            "Using the \"Copy settings to...\" dropdown, then Apply",
            "It's not possible — redirections are Search Engine-specific only",
            "By exporting and re-importing the data feed"
          ],
          correct: 1,
          explain: "The \"Copy settings to...\" dropdown next to \"Add redirection\" lets a set of redirections be applied to another Search Engine, followed by Apply."
        },
        {
          q: "Where can an existing redirection be activated, deactivated, edited or deleted?",
          options: [
            "From its three-dot menu in the redirections list",
            "Only by contacting <strong>Doofinder</strong> support",
            "From the Field Name Mapping screen",
            "It can't be changed once saved"
          ],
          correct: 0,
          explain: "Each redirection in the list can be activated, deactivated, edited or deleted from its three-dot menu."
        }
      ]
    },
    {
      id: 6,
      code: "6",
      moduleTag: "Module 1 Section 3",
      navGroup: "BANNERS",
      navLabel: "Banners",
      eyebrow: "6. BANNERS",
      title: "Banners",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/promotional-tools/banners",
      theory: {
        lead: "<strong>Banners</strong> let you promote a specific product or a marketing campaign right inside the Search Layer's results, triggered by whichever search terms you choose.",
        pages: [
          [
            {
              html: `
                <p>Banners can be shown for specific search terms, during a chosen time period, or set as the default banner shown across every other search. They're configured from the <strong>Admin Panel</strong>, under Search → Promotional Tools → Banners, by clicking "Add Banner".</p>
                <p>Setting one up means filling in:</p>
                <ul>
                  <li>A <strong>Name</strong>, to tell it apart from the others.</li>
                  <li>A <strong>Status</strong> checkbox, to enable or disable it without deleting it.</li>
                  <li>Whether it's the <strong>Default Banner</strong> — the one shown for every search term that isn't otherwise covered. Only one banner can be default at a time; marking a new one as default automatically un-defaults whichever one held that spot before.</li>
                  <li>An optional <strong>Duration</strong>, a date range the banner is limited to.</li>
                  <li>Its search terms, each set to Exact Match (triggers only on that exact term) or Broad Match (triggers whenever the typed text contains it) — unless it's the default banner, which ignores search terms altogether.</li>
                </ul>`
            }
          ],
          [
            {
              html: `
                <p>The banner's visuals are set either by uploading an image (or pasting a URL directly), a <strong>Target link</strong> for where a click should lead, and an "Open in new window" checkbox — or, for full control, with hand-written <strong>HTML code</strong>, which overrides those manual fields entirely and requires knowing HTML to use.</p>
                <p>An uploaded image needs to be a .jpg, .jpeg, .gif or .png, no larger than 150 KB. <strong>Doofinder</strong> recommends roughly 150×500–800 pixels for desktop and 640×100 for mobile, though it's only a recommendation — a banner can be sized however best fits the Layer it's shown in. As with most configuration screens, remember to actually click Save before navigating away.</p>
                <p>Existing banners can be edited by clicking their name, or through the three-dot menu, which also offers duplicate and delete; deleting instead works by ticking a banner's checkbox and confirming with the red delete button that appears.</p>`
            }
          ],
          [
            {
              html: `
                <p>The Banners list shows, per banner: its Name, the search terms that trigger it, its <strong>Impressions</strong> (counted once per minute regardless of how many times it actually appeared in that window), its Clicks, its <strong>CTR</strong> (click-through rate), the active date period, its Status (enabled, only if its search terms are matching, or disabled), and a star (⭐) marking whichever banner is currently the default.</p>`
            }
          ]
        ]
      },
      quiz: [
        {
          q: "What are Banners used for?",
          options: [
            "Promoting a specific product or marketing campaign inside the search results",
            "Blocking bot traffic by IP",
            "Mapping feed fields to normalized field names",
            "Generating search suggestions automatically"
          ],
          correct: 0,
          explain: "Banners let you promote certain products or marketing campaigns right inside the search results."
        },
        {
          q: "How many banners can be set as default at the same time?",
          options: ["Only one", "Up to three", "One per search term", "Unlimited"],
          correct: 0,
          explain: "Only one banner can be set as default — marking a new one as default automatically un-defaults the previous one."
        },
        {
          q: "What happens when a new banner is marked as Default?",
          options: [
            "Nothing changes for other banners",
            "The previous default banner is automatically unset",
            "All other banners are deleted",
            "The new banner's search terms are ignored"
          ],
          correct: 1,
          explain: "Whenever a banner is set as default, the previous one (if it exists) is automatically unset."
        },
        {
          q: "What overrides a banner's manual image and link fields?",
          options: ["The Duration field", "Hand-written HTML code", "The Default Banner toggle", "The three-dot menu"],
          correct: 1,
          explain: "Using HTML code to build or customize a banner overrides the manual fields, and requires knowing HTML to use."
        },
        {
          q: "What's the maximum file size for an uploaded banner image?",
          options: ["50 KB", "150 KB", "500 KB", "1 MB"],
          correct: 1,
          explain: "An uploaded banner image can be at most 150 KB, in .jpg, .jpeg, .gif or .png format."
        },
        {
          q: "Is the recommended banner size (e.g. 150×500–800px for desktop) mandatory?",
          options: [
            "Yes, uploads outside that size are rejected",
            "No, it's only a recommendation — a banner can be sized to fit its Layer",
            "Only for the default banner",
            "Only on mobile"
          ],
          correct: 1,
          explain: "The recommended dimensions aren't mandatory — banners can be sized however best fits the Layer they're shown in."
        },
        {
          q: "How are a banner's Impressions counted in the main panel?",
          options: [
            "Once per minute, regardless of how many times it actually appeared",
            "Once per click",
            "Once per <strong>Doofinder</strong> account, ever",
            "They aren't tracked at all"
          ],
          correct: 0,
          explain: "Impressions are counted once per minute, regardless of the actual number of occurrences in that window."
        },
        {
          q: "What does the star (⭐) symbol indicate in the Banners list?",
          options: [
            "That the banner has the highest CTR",
            "That the banner is currently set as default",
            "That the banner uses HTML code",
            "That the banner is disabled"
          ],
          correct: 1,
          explain: "The star marks whichever banner is currently set as the default one, shown for every other search term."
        }
      ]
    },
    {
      id: 7,
      code: "7",
      moduleTag: "Module 1 Section 3",
      navGroup: "COPY SETTINGS",
      navLabel: "Copy Settings",
      eyebrow: "7. COPY SETTINGS",
      title: "Copy Settings",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/test-your-search-engine/copy-settings",
      theory: {
        lead: "<strong>Copy Settings</strong> lets a whole configuration — Custom Results, Banners, Redirections, Synonyms, Filters or Search Fields — be duplicated from one Search Engine to another within the same Store, instead of rebuilding it by hand every time.",
        pages: [
          [
            {
              html: `
                <p>Before copying anything, it's worth checking that <strong>product names</strong> and the two Search Engines' <strong>languages</strong> actually match between source and destination — a mismatched value may simply not be recognized once it lands on the target Search Engine.</p>
                <p>Using it means clicking <strong>"Copy Settings to…"</strong>, usually found at the top of a configuration's list (Custom Results, Banners, Redirections, Synonyms and so on each have their own). From there: pick the destination Search Engine(s) from the dropdown, click <strong>"Apply"</strong>, choose one of two options in the confirmation dialog that appears, then click <strong>"Yes, apply"</strong> to save the changes.</p>`
            }
          ],
          [
            {
              html: `
                <p>The confirmation dialog offers two very different options:</p>
                <ul>
                  <li><strong>Copy and Add to Existing Settings</strong> — adds the source Search Engine's configuration on top of the destination's, leaving whatever was already there untouched.</li>
                  <li><strong>Copy and Replace Existing Settings</strong> — overwrites the destination's configuration entirely, deleting its original settings.</li>
                </ul>
                <p>That second option is worth treating with real caution: once a <strong>Replace</strong> has been applied, <strong>it can't be undone</strong>, and the destination's original settings can't be recovered.</p>`
            }
          ]
        ]
      },
      quiz: [
        {
          q: "What does Copy Settings let you do?",
          options: [
            "Duplicate a configuration set from one Search Engine to another within the same Store",
            "Merge two Stores into one",
            "Change a Search Engine's language automatically",
            "Copy an entire data feed to a new Store"
          ],
          correct: 0,
          explain: "Copy Settings duplicates a configuration — like Custom Results or Banners — from one Search Engine onto another, within the same Store."
        },
        {
          q: "Which of these can Copy Settings duplicate?",
          options: [
            "Custom Results, Banners, Redirections, Synonyms, Filters and Search Fields",
            "The Store's Authorized Domains only",
            "The Store ID and Hash ID",
            "The data feed's file format"
          ],
          correct: 0,
          explain: "Copy Settings covers configuration sets like Custom Results, Banners, Redirections, Synonyms, Filters and Search Fields."
        },
        {
          q: "What should be checked before copying settings between two Search Engines?",
          options: [
            "That product names and the two Search Engines' languages match",
            "That both Search Engines share the same Hash ID",
            "That the Store's currency is set to USD",
            "That the CSS selector is identical on both"
          ],
          correct: 0,
          explain: "Mismatched product names or languages between source and destination may not be recognized once copied over — it's worth checking both first."
        },
        {
          q: "Where is the \"Copy Settings to…\" option usually found?",
          options: [
            "At the top of a configuration's list, like Custom Results or Banners",
            "Inside the Security Settings screen",
            "Only in the installation script",
            "Inside the Results Preview panel"
          ],
          correct: 0,
          explain: "\"Copy Settings to…\" is typically found at the top of the relevant configuration's list."
        },
        {
          q: "What are the two options offered in the confirmation dialog after clicking Apply?",
          options: [
            "Copy and Add to Existing Settings, or Copy and Replace Existing Settings",
            "Copy Now, or Copy Later",
            "Export as CSV, or Export as XML",
            "Enable, or Disable"
          ],
          correct: 0,
          explain: "The dialog offers a choice between adding the copied settings on top of the existing ones, or replacing them entirely."
        },
        {
          q: "What does \"Copy and Add to Existing Settings\" do?",
          options: [
            "Adds the source's settings on top of the destination's, keeping what was already there",
            "Deletes every setting on the destination Search Engine",
            "Only copies Search Fields, nothing else",
            "Requires deleting the source Search Engine afterward"
          ],
          correct: 0,
          explain: "This option layers the copied configuration on top of the destination's existing settings, without touching what was already there."
        },
        {
          q: "What does \"Copy and Replace Existing Settings\" do?",
          options: [
            "Nothing changes on the destination Search Engine",
            "It overwrites the destination's configuration entirely, deleting its original settings",
            "It only replaces Banners, never other settings",
            "It asks for a second confirmation the next day"
          ],
          correct: 1,
          explain: "Replace overwrites the destination Search Engine's configuration completely, deleting whatever was configured there before."
        },
        {
          q: "Can a \"Copy and Replace Existing Settings\" action be undone afterward?",
          options: [
            "Yes, at any time from the Reset button",
            "No — once applied, the original settings can't be recovered",
            "Only within 24 hours",
            "Only if the source Search Engine still exists"
          ],
          correct: 1,
          explain: "Once a Replace has been applied, it can't be undone, and the destination's original settings can't be recovered — so it's worth using with real caution."
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
      title: "Final Exercise",
      hasQuiz: false,
      pages: [
        {
          intro: [
            "This section's final exercise is still being designed.",
            "Check back soon."
          ]
        }
      ]
    }
  ]
};
