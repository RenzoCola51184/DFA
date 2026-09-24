/* Doofinder Academy — Module 1 Section 3 content
   Section 0 is a recap of Module 1 Section 2 and section 1 is this section's
   introduction — neither has a quiz. Sections 2-7 each have a theory block
   and a quiz. Section 8 is the final guided exercise. */

const COURSE = {
  nextSection: { label: "Back to the Course Path →", href: "index.html" },
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
                <li><strong>Introduction</strong> — the goal of the section: understanding how <strong>Doofinder</strong>'s search decides and ranks what it shows, and how that can be configured or changed.</li>
                <li><strong>How Doofinder Search Works</strong> — clicking the search box activates the Search Layer, which opens a WebSocket connection to Doofinder's servers and calls the search API every time something is typed; result quality depends mainly on the data feed's content and structure and on the Search Engine's configuration (Search Fields, Relevance Criteria, Boosting, Custom Results, Excluded Results and Synonyms).</li>
                <li><strong>Results Preview</strong> — testing Doofinder's response to a query, Score as Relevance × Boosting, the four query types (match_and, match_or, fuzzy, match_all) with the match_and → match_or → fuzzy fallback, and how stemming and character cleaning affect matches.</li>
                <li><strong>Search Fields</strong> — which fields a Search Engine searches and the weight (1 to 10) each one carries, the automatically created <code>df_all</code> field, and fields outside the data feed such as <code>.autocomplete</code> and <code>.light_explode</code> ones.</li>
                <li><strong>Relevance Criteria</strong> — the criteria used to sort results, applied one after the other in the order they're listed; Score is the default criterion and is recommended to stay first.</li>
                <li><strong>Boosting</strong> — a multiplier on a product's score, applied in four ways: Manual Boosting, Boosting Rules, Automatic Boosting and Boosting Through Data Feed via <code>df_manual_boost</code>.</li>
                <li><strong>Custom Results</strong> — forcing, including or excluding products for specific search terms with Exact or Broad Match, and how Custom Results interact with Relevance Criteria and Boosting.</li>
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
          intro: [],
          slack: {
            name: "Amanda House",
            channel: "amanda-samanta",
            body: [
              [
                "Hey Samantha!",
                "Big news — I'm finally taking the vacation I've been putting off. Two weeks, starting tomorrow. No laptop, I promise John."
              ],
              [
                "Before I go, there's a short list of things piling up on Doostride's search that I'd like you to look into while I'm out.",
                "I don't get why the same shoe shows up several times in a row, once per size — it would be much better if only one result showed up for all its variants. Can you look into it?",
                "Also, we discontinued the whole Kids line last month, but a couple of those products are apparently still showing up in search.",
                "Searching \"trainers\" doesn't return any results at all — we need to fix that.",
                "We still don't have redirections set up for \"return policy\" or \"contact us\" either — right now those just show a results page full of nothing useful.",
                "And Black Friday is coming up fast — we don't have a banner pointing people to the campaign page yet."
              ],
              [
                "Once all of that's sorted on the English Search Engine, mirror it over to the Spanish one too — I don't want the two storefronts drifting apart.",
                "I know that's a lot, but I trust you with it. I left you some reading below — you've got two weeks, and you've got this!"
              ]
            ],
            times: ["09:14", "09:16", "09:20"]
          },
          slackIntro: [
            "In this section, you are <strong>Samantha Garden</strong>, Amanda House's assistant at Doostride. You've spent the last few months helping Amanda with day-to-day ecommerce tasks, and this is the first time she's leaving you in charge of the web on your own.",
            "This morning, you got this message from <strong>Amanda</strong> on Slack."
          ],
          slackNote: [
            "Before tackling her list, you'll need to get familiar with six more Doofinder features: <strong>Grouping Product Variants</strong>, <strong>Excluded Results</strong>, <strong>Synonyms</strong>, <strong>Copy Settings</strong>, <strong>Redirections</strong> and <strong>Banners</strong>.",
            "Your goal throughout this section is to learn how each one works, so that by the final exercise you can fix everything Amanda listed before she's back."
          ]
        }
      ]
    },
    {
      id: 2,
      code: "2",
      moduleTag: "Module 1 Section 3",
      navGroup: "GROUPING PRODUCT VARIANTS",
      navLabel: "Grouping Product Variants",
      eyebrow: "2. GROUPING PRODUCT VARIANTS",
      title: "Grouping Product Variants",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/managing-data/grouping-product-variants",
      theory: {
        lead: "An ecommerce often has products that belong to the same product group, but are different variants of it — for example, the <strong>Nike Sportswear Phoenix Hoodie</strong> can come in different sizes and colors.",
        blocks: [
          {
            html: `
              <h3>Every Variant Is Indexed</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 440px; max-width: 55%;">
                  <img src="img/grouping-feed-variants.png" alt="Data feed with the columns id, title, color and size, and two rows: 1001, Nike Sportswear Phoenix Hoodie, Baby pink, S; and 1002, Nike Sportswear Phoenix Hoodie, Mint green, M" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>For every variant to be searchable, each one needs to be indexed — so they all need to be loaded into the index. In the data feed, the two variants of the hoodie look like this.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-right" style="width: 300px; max-width: 55%;">
                  <img src="img/grouping-layer-ungrouped.png" alt="Search Layer with the search Nike Sportswear Phoenix Hoodie: 2 results found, one Nike Sportswear Phoenix Hoodie in S / Baby pink and one in M / Mint green, both at 68,00 €, with Categories, Brands and Price filters on the left" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>But what happens when searching for "Nike Sportswear Phoenix Hoodie"? Both variants appear in the Search Layer. This can create some visual confusion, especially when a group is made up of many variants.</p>
              <p>The solution is to show only one variant in the Search Layer, and then use a filter to choose the variant wanted. This lesson explains how to group the variants — applying filters in the Search Layer is covered later in the course.</p>

              <h3>The group_id Field</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 460px; max-width: 55%;">
                  <img src="img/grouping-feed-group-id.png" alt="Data feed with the columns id, title, color, size and group_id: 1001, Nike Sportswear Phoenix Hoodie, Baby pink, S, H100; 1002, Nike Sportswear Phoenix Hoodie, Mint green, M, H100; and 1003, Nike Club Fleece Joggers, Black, M, J200" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>To group the variants, a field called <code>group_id</code> needs to be indexed: products with the same <code>group_id</code> can be grouped under the same group.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-left" style="width: 280px; max-width: 55%;">
                  <img src="img/grouping-layer-grouped.png" alt="Search Layer with the search Nike Sportswear Phoenix Hoodie: 1 result found, the Nike Sportswear Phoenix Hoodie in S / Baby pink at 68,00 €, with only the Color (Baby pink, Mint green) and Size (S, M) filters on the left" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>In this feed, the two hoodies share the <code>group_id</code> <strong>H100</strong>, so they're grouped together and show up as a single result. The joggers have a different <code>group_id</code> (<strong>J200</strong>), so they stay a separate product.</p>
              <p>With the two hoodies grouped, the same search for "Nike Sportswear Phoenix Hoodie" shows a single result, and both colors and sizes are available as filters to choose the variant wanted. The Search Layer shows 1 result found, with Baby pink and Mint green under Color, and S and M under Size.</p>

              <h3>Group Variants As a Single Item</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 520px; max-width: 55%;">
                  <img src="img/grouping-variants-toggle.png" alt="Indices Configuration section with the 'Group variants as a single item' toggle switched on, the 'Automatic Indexing' toggle switched off, and a Save button" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Besides indexing <code>group_id</code>, grouping needs to be turned on in the Search Engine:</p>
              <ol>
                <li>Go to <strong>Configuration &gt; Search Engines</strong> and click <strong>"See indices"</strong>.</li>
                <li>In <strong>Indices</strong>, scroll down to the <strong>Configuration</strong> section.</li>
                <li>Enable <strong>"Group variants as a single item"</strong>, then click <strong>"Save"</strong>.</li>
              </ol>

              <h3>Which Variant Is Shown</h3>
              <p>Once the variants are grouped, the variant shown is the one with the most score for the query. If the variants have the same score, the first variant indexed is the one shown.</p>
              <p>For example, with the two hoodies grouped under H100 (simplified numbers, for illustration only):</p>
              <table class="theory-table">
                <thead><tr><th>Query</th><th>Baby pink (id 1001)</th><th>Mint green (id 1002)</th><th>Variant shown</th></tr></thead>
                <tbody>
                  <tr><td>"phoenix hoodie mint"</td><td>Score 3</td><td>Score 5</td><td>Mint green — it has the most score</td></tr>
                  <tr><td>"phoenix hoodie"</td><td>Score 4</td><td>Score 4</td><td>Baby pink — same score, and it was indexed first</td></tr>
                </tbody>
              </table>

              <h3>The group_leader Field</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 500px; max-width: 55%;">
                  <img src="img/grouping-feed-group-leader.png" alt="Data feed with the columns id, title, color, size, group_id and group_leader: 1001, Nike Sportswear Phoenix Hoodie, Baby pink, S, H100, false; and 1002, Nike Sportswear Phoenix Hoodie, Mint green, M, H100, true" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>A field called <code>group_leader</code> can be indexed to force a specific variant to appear when the variants have the same score. The leader's value needs to be <strong>true</strong>, while all the others are <strong>false</strong>.</p>
              <div style="clear: both;"></div>
              <p>With the Mint green hoodie set as the leader:</p>
              <table class="theory-table">
                <thead><tr><th>Query</th><th>Baby pink (false)</th><th>Mint green (true)</th><th>Variant shown</th></tr></thead>
                <tbody>
                  <tr><td>"phoenix hoodie"</td><td>Score 4</td><td>Score 4</td><td>Mint green — same score, so the leader appears, even though Baby pink was indexed first</td></tr>
                  <tr><td>"phoenix hoodie pink"</td><td>Score 5</td><td>Score 3</td><td>Baby pink — it has the most score, so the leader doesn't come into play</td></tr>
                </tbody>
              </table>
              <p class="theory-callout"><code>group_leader</code> only decides between variants with the same score: a variant with more score for the query is still the one shown.</p>
              <figure class="lesson-figure lesson-figure-right" style="width: 500px; max-width: 55%;">
                  <img src="img/grouping-feed-group-leader-parent.png" alt="Data feed with the columns id, title, color, size, group_id and group_leader: 1000, Nike Sportswear Phoenix Hoodie, no color, no size, H100, true; 1001, Nike Sportswear Phoenix Hoodie, Baby pink, S, H100, false; and 1002, Nike Sportswear Phoenix Hoodie, Mint green, M, H100, false" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Ideally, the group leader should be a product with no attributes, like size or color — that way, it's a true group leader, representing the product as a whole rather than one of its variants.</p>
              <p>For example, in this feed the hoodie has a row of its own (id 1000) with no color and no size, set as the group leader, while the Baby pink and Mint green variants are both set to false.</p>

              <h3>Relevance Criteria</h3>
              <p>The variant shown also depends on <strong>Relevance Criteria</strong>: if the first criterion isn't Score, the variant shown depends on the criteria listed before it.</p>
              <p>For example, with Relevance Criteria set to <code>best_price</code> (Lowest to highest) first and Score (Highest to lowest) second:</p>
              <table class="theory-table">
                <thead><tr><th>Variant</th><th>Score</th><th><code>best_price</code></th><th>Variant shown</th></tr></thead>
                <tbody>
                  <tr><td>Baby pink</td><td>5</td><td>68</td><td>—</td></tr>
                  <tr><td>Mint green</td><td>3</td><td>60</td><td>Mint green — best_price comes first, and it's the cheapest</td></tr>
                </tbody>
              </table>`
          }
        ]
      },
      quiz: [
        {
          q: "A store sells a <strong>Trail Running Shoe</strong> in sizes 40, 41 and 42, and wants every size to be searchable. What does that require?",
          options: [
            "Indexing only one size, and listing the others in its description",
            "Indexing every size, so all of them are loaded into the index",
            "Indexing only the size marked as group_leader",
            "Nothing — Doofinder creates the variants on its own"
          ],
          correct: 1,
          explain: "For every variant to be searchable, each one needs to be indexed, so they all need to be loaded into the index. A variant that isn't indexed can't be found, and Doofinder doesn't create variants that aren't in the feed."
        },
        {
          q: "That shoe's three sizes are indexed as three rows, with no grouping set up. What does a search for \"trail running shoe\" show in the Search Layer?",
          options: [
            "Only size 40, since it's the first one indexed",
            "A single result with a size filter",
            "All three sizes, as three separate results",
            "No results, since the titles are duplicated"
          ],
          correct: 2,
          explain: "Without grouping, every indexed variant that matches the query appears in the Search Layer as its own result — which is exactly the visual confusion grouping solves."
        },
        {
          q: "A feed has these rows: <strong>Denim Jacket</strong> blue (group_id DJ1), <strong>Denim Jacket</strong> black (group_id DJ1) and <strong>Denim Shirt</strong> (group_id DS2). A search matches all three. How many results show up once grouping is set up?",
          options: [
            "Two: one Denim Jacket and one Denim Shirt",
            "Three, since each row has its own color",
            "One, since all three contain \"Denim\"",
            "None, since the group_id values don't all match"
          ],
          correct: 0,
          explain: "Products with the same group_id are grouped under the same group. Both jackets share DJ1, so they show up as one result; the shirt has DS2, so it stays separate. The title doesn't decide the grouping — group_id does."
        },
        {
          q: "A grouped <strong>Leather Bag</strong> has two variants with no group_leader set. For a query, <strong>Brown</strong> (indexed first) has a score of 4 and <strong>Black</strong> (indexed second) has a score of 6. Which variant is shown?",
          options: [
            "Brown, since it was indexed first",
            "Both, since their scores are different",
            "Neither, since no group_leader is set",
            "Black, since it has the most score"
          ],
          correct: 3,
          explain: "The variant with the most score for the query is the one shown. The indexing order only matters when the variants have the same score."
        },
        {
          q: "A grouped <strong>Wool Scarf</strong> has two variants with no group_leader set: <strong>Grey</strong>, indexed first, and <strong>Red</strong>, indexed second. For a query, both have a score of 5. Which variant is shown?",
          options: [
            "Red, since it was indexed last",
            "Grey, since it was indexed first",
            "Both, since they tie on score",
            "Whichever is cheaper"
          ],
          correct: 1,
          explain: "When the variants have the same score, the first variant indexed is the one shown — here, Grey."
        },
        {
          q: "A grouped <strong>Canvas Sneaker</strong> has two variants tied on score for a query: <strong>White</strong>, indexed first with group_leader false, and <strong>Black</strong>, indexed second with group_leader true. Which variant is shown?",
          options: [
            "Black, since it's the group leader",
            "White, since it was indexed first",
            "Both, since they tie on score",
            "Neither, since only one variant can be indexed"
          ],
          correct: 0,
          explain: "With the same score, group_leader forces the variant set to true to appear — so Black is shown, even though White was indexed first."
        },
        {
          q: "Same sneaker, but for a different query: <strong>White</strong> (group_leader false) has a score of 7, and <strong>Black</strong> (group_leader true) has a score of 3. Which variant is shown?",
          options: [
            "Black, since the group leader always appears",
            "Both, since one is the leader and the other has more score",
            "White, since it has the most score",
            "Neither, since the leader has the lower score"
          ],
          correct: 2,
          explain: "group_leader only decides between variants with the same score. Here White has more score for the query, so it's the one shown."
        },
        {
          q: "A <strong>Cotton T-Shirt</strong> comes in white/S, white/M and black/L, all with the same group_id. Which of these feed setups follows the ideal way of choosing the group leader?",
          options: [
            "White/S set to true, since it's the first variant indexed",
            "All three variants set to true",
            "A fourth row for the Cotton T-Shirt with no color and no size, set to true, and the three variants set to false",
            "Black/L set to true, since it's the only black one"
          ],
          correct: 2,
          explain: "Ideally, the group leader is a product with no attributes like size or color: that way it's a true group leader, representing the product as a whole rather than one of its variants. Picking any single variant works, but it isn't the ideal setup — and only one item in the group can be true."
        },
        {
          q: "Relevance Criteria is set to <code>best_price</code> (Lowest to highest) first and Score (Highest to lowest) second. A grouped <strong>Backpack</strong> has <strong>Blue</strong> (score 6, best_price 50) and <strong>Green</strong> (score 3, best_price 40). Which variant is shown?",
          options: [
            "Blue, since it has the most score",
            "Blue, since Score always decides the variant shown",
            "Both, since each one wins on a different criterion",
            "Green, since best_price comes first and it's the cheapest"
          ],
          correct: 3,
          explain: "When the first Relevance Criteria isn't Score, the variant shown depends on the criteria listed before it. best_price Lowest to highest comes first, so the cheaper Green is shown, even with less score."
        },
        {
          q: "Which values does <code>group_leader</code> take within a group?",
          options: [
            "true on every variant of the group",
            "true on the leader, and false on all the other variants",
            "The leader's id, on every variant of the group",
            "1 on the leader, and 2, 3, 4… on the others, in order of priority"
          ],
          correct: 1,
          explain: "The leader's group_leader value needs to be true, while all the other variants in the group are false."
        }
      ]
    },
    {
      id: 3,
      code: "3",
      moduleTag: "Module 1 Section 3",
      navGroup: "EXCLUDED RESULTS",
      navLabel: "Excluded Results",
      eyebrow: "3. EXCLUDED RESULTS",
      title: "Excluded Results",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/getting-started/excluded-results",
      theory: {
        lead: "<strong>Excluded Results</strong> is a feature to remove products from a Search Engine, even though they're still loaded in its indices.",
        blocks: [
          {
            html: `
              <p>Since a Search Engine feeds every <strong>Doofinder</strong> product, excluded products don't appear in any of them — the Search Layer, Recommendations, Quiz Maker, and so on.</p>

              <h3>An Example</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 440px; max-width: 55%;">
                  <img src="img/excluded-feed-sunglasses.png" alt="Data feed with the columns id, title, brand and price: 3001, Ray-Ban Unisex Sunglasses, Ray-Ban, 124.00; 3002, Ray-Ban Andy Sunglasses, Ray-Ban, 119.00; and 3003, Gucci GG Round Acetate Sunglasses, Gucci, 195.00" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Take a data feed with these three sunglasses: two Ray-Ban models and one Gucci model. Each row is a product, with its <code>id</code>, <code>title</code>, <code>brand</code> and <code>price</code>, and all three are loaded into the index.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-right" style="width: 380px; max-width: 55%;">
                  <img src="img/excluded-layer-before.png" alt="Search Layer with the search sunglasses: 3 results found — Ray-Ban Unisex Sunglasses at 124,00 €, Ray-Ban Andy Sunglasses at 119,00 € and Gucci GG Round Acetate Sunglasses at 195,00 € — with a Brands filter listing Ray-Ban (2) and Gucci (1)" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Searching for "sunglasses" in the Search Layer, all three show up — each one with its image, title and price — and the Brands filter counts two Ray-Ban products and one Gucci product.</p>
              <p>Now, the <strong>Gucci GG Round Acetate Sunglasses</strong> shouldn't show up anymore, but the product stays in the data feed. Excluded Results makes that possible without touching the feed at all.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-left" style="width: 360px; max-width: 55%;">
                  <img src="img/excluded-admin-individual-item.png" alt="Excluded Results screen in the Admin Panel with the Gucci GG Round Acetate Sunglasses listed under Individual items, an Add results link and a Save button" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>In the Admin Panel, the product is added to <strong>Excluded Results</strong> as an individual item — clicking "+ Add results" → "Individual items", picking the product and clicking "Add item" — and the change is saved. More than one product can be picked at a time, if several need to be excluded.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-right" style="width: 380px; max-width: 55%;">
                  <img src="img/excluded-layer-after.png" alt="Search Layer with the same search sunglasses: 2 results found — Ray-Ban Unisex Sunglasses at 124,00 € and Ray-Ban Andy Sunglasses at 119,00 € — with a Brands filter listing only Ray-Ban (2)" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>The same search for "sunglasses" now shows only the two Ray-Ban models. The Gucci sunglasses are still in the data feed and in the index — they just don't appear in the Search Layer, nor in Recommendations or Quiz Maker.</p>

              <h3>Selecting the Products</h3>
              <p>Products are selected for Excluded Results the same way seen in the <strong>Custom Results</strong> lesson — here's a brief recap.</p>
              <p>There are two ways to exclude items:</p>
              <table class="theory-table">
                <thead><tr><th>Method</th><th>How it works</th></tr></thead>
                <tbody>
                  <tr><td><strong>By item</strong></td><td>Click "+Add results" → "Individual items", type in the product as it's registered in the data feed, select it (more than one can be picked at a time) and click "Add item", then save. Up to <strong>100 items</strong> can be excluded this way per Search Engine.</td></tr>
                  <tr><td><strong>By rules</strong></td><td>Exclude by a filter instead of naming products one by one. The filter needs to already exist in the product data feed and be configured as a filter, whether or not it's set as visible on the Layer. Pick an attribute from the "Select field" dropdown (e.g. brand), a value from "select value" (e.g. Adidas), then click "Add rule" and save.</td></tr>
                </tbody>
              </table>
              <p>Both approaches can be combined on the same Search Engine — excluding some items individually and others by rule at the same time.</p>

              <h3>Combining Rules</h3>
              <p>Rules can also be combined into AND/OR conditions, exactly as in <strong>Custom Results</strong>:</p>
              <table class="theory-table">
                <thead><tr><th>Condition</th><th>When it happens</th><th>Example</th></tr></thead>
                <tbody>
                  <tr><td><strong>AND</strong></td><td>Two different filters together</td><td>Category "Shoes" and color "blue"</td></tr>
                  <tr><td><strong>OR</strong></td><td>Two values in the same filter</td><td>Color "blue" or "red"</td></tr>
                  <tr><td><strong>Both</strong></td><td>AND and OR mixed in the same rule</td><td>—</td></tr>
                </tbody>
              </table>

              <h3>Excluding Out of Stock Products</h3>
              <p>One of the most important uses of <strong>Excluded Results</strong> is excluding products whose <code>availability</code> is <strong>out of stock</strong>. Out of stock products are usually indexed too, so an Excluded Results rule — <code>availability</code> is <code>out of stock</code> — is the easiest way to exclude them from the search, instead of removing them directly from the sources the indexing takes its data from.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What does Excluded Results let you do?",
          options: [
            "Hide a Search Engine's error messages",
            "Change the currency of a Search Engine",
            "Rename a Store's domain",
            "Intentionally remove specific items from a Search Engine's results"
          ],
          correct: 3,
          explain: "Excluded Results lets you remove certain items from a Search Engine's results, either individually or in batches picked out by rules."
        },
        {
          q: "Where is Excluded Results configured?",
          options: [
            "Admin Panel > Search > Layer Settings",
            "Admin Panel > Managing Data > Field Name Mapping",
            "Admin Panel > Configuration > Excluded Results",
            "It can only be set from the data feed itself"
          ],
          correct: 2,
          explain: "It's configured from the Admin Panel, under Configuration > Excluded Results, on the Search Engine you want to affect."
        },
        {
          q: "Which <strong>Doofinder</strong> services are affected when an item is excluded from a Search Engine?",
          options: [
            "Only the Search Layer",
            "Search, Recommendations, Quiz Maker and the other services fed by that Search Engine",
            "Only Recommendations",
            "None — exclusion only affects the Admin Panel's own reports"
          ],
          correct: 1,
          explain: "Since a Search Engine feeds every <strong>Doofinder</strong> product, excluding an item there affects all of them at once."
        },
        {
          q: "What's the maximum number of items that can be excluded individually per Search Engine?",
          options: ["100", "10", "1,000", "There's no limit"],
          correct: 0,
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
          options: ["An AND condition", "Both are ignored", "A duplicate error", "An OR condition"],
          correct: 3,
          explain: "Adding two or more values in the same row generates an OR condition."
        },
        {
          q: "A Store indexes all its products, out of stock ones included, but doesn't want out of stock products to show up in the search. What's the easiest way to exclude them?",
          options: [
            "Removing them from the source the data feed is built from, before every indexing",
            "A Custom Result for every search term, excluding them one by one",
            "An Excluded Results rule: availability is out of stock",
            "A synonym set that replaces \"out of stock\" with \"in stock\""
          ],
          correct: 2,
          explain: "Out of stock products are usually indexed too, and an Excluded Results rule on availability is the easiest way to exclude them from the search — much simpler than removing them from the indexing sources. Custom Results only apply to specific search terms, and a synonym doesn't remove any product."
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
        lead: "Sometimes a user searches for a product and doesn't find it, because the product is indexed with a different term from the one searched.",
        blocks: [
          {
            html: `
              <h3>The Problem</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 190px; max-width: 55%;">
                  <img src="img/synonyms-layer-before.png" alt="Search Layer with the search training: 0 results found and a No results found message" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>For example, a Store's data feed has a product titled <strong>Sport Shoes</strong>. For a user, "sport shoes" and "training shoes" are the same thing — but a user who searches for "training" doesn't find it: the word "training" doesn't appear anywhere in the product's data, so the Search Layer shows 0 results.</p>

              <h3>How Synonyms Work</h3>
              <p><strong>Synonyms</strong> is a feature that helps fix this. It associates an indexed term with another term, so that the other term gets indexed too.</p>
              <p>So, for the <strong>Sport Shoes</strong> to also be found with the query "training shoes", a synonym can be created between the two terms "sport" and "training".</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-left" style="width: 330px; max-width: 55%;">
                  <img src="img/synonyms-admin-set.png" alt="Add synonym dialog in the Admin Panel: Status toggle on, Synonym selected as the way to make the replacement (the other option is Explicit replacement), the terms sport, training in the list of terms separated by commas, and Cancel and Save buttons" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>In the Admin Panel, that's a synonym of the <strong>Synonyms</strong> type with the terms <code>sport</code> and <code>training</code>, written as <code>sport, training</code>.</p>
              <p>In the <strong>Add synonym</strong> dialog, <strong>Synonym</strong> is selected as the way to make the replacement, the terms are added as a list separated by commas, and the synonym is saved with <strong>"Save"</strong>. The <strong>Status</strong> toggle, switched on, keeps the synonym active. In this case, it's as if the product were indexed as <strong>"Sport Training Shoes"</strong>.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-right" style="width: 190px; max-width: 55%;">
                  <img src="img/synonyms-layer-after.png" alt="Search Layer with the search training: 1 result found, the Sport Shoes at 59,00 €" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Now the same search for "training" finds the <strong>Sport Shoes</strong>, and so do "training shoes" and "sport shoes": both terms work.</p>

              <h3>The Indexed Term Must Match Exactly</h3>
              <p>The term the synonym is created from — the first one in the set — needs to be indexed exactly as it's written. For example, if the product were titled <strong>"Sports Shoes"</strong>, the synonym <code>sport, training</code> wouldn't be created for it, since "sport" isn't indexed as such. So before creating a synonym, it's worth checking how the term is actually written in the product's data.</p>
              <table class="theory-table">
                <thead><tr><th>Product title</th><th>Synonym</th><th>Search "training"</th></tr></thead>
                <tbody>
                  <tr><td>Sport Shoes</td><td><code>sport, training</code></td><td>Finds the product — "sport" is indexed exactly as written</td></tr>
                  <tr><td>Sports Shoes</td><td><code>sport, training</code></td><td>Doesn't find it — "sport" isn't indexed as such, only "sports" is</td></tr>
                </tbody>
              </table>

              <h3>Explicit Replacement Type</h3>
              <p>Besides the <strong>Synonyms</strong> type, there's the <strong>Explicit Replacement</strong> type, written as <code>Term1 => Term2</code>. Instead of adding the other term, it replaces the indexed term with it: with <code>sport => training</code>, it's as if the product were indexed as "Training Shoes".</p>
              <table class="theory-table">
                <thead><tr><th>Type</th><th>Written as</th><th>Search "sport"</th><th>Search "training"</th></tr></thead>
                <tbody>
                  <tr><td><strong>Synonyms</strong></td><td><code>sport, training</code></td><td>Finds the Sport Shoes</td><td>Finds the Sport Shoes</td></tr>
                  <tr><td><strong>Explicit Replacement</strong></td><td><code>sport => training</code></td><td>Doesn't find them anymore</td><td>Finds the Sport Shoes</td></tr>
                </tbody>
              </table>
              <p class="theory-callout">With Explicit Replacement, the original indexed term stops working as a search term — only the replacement does. With the Synonyms type, both terms keep working.</p>

              <h3>AI SynonymBoost</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 420px; max-width: 55%;">
                  <img src="img/synonyms-ai-synonymboost.png" alt="AI SynonymBoost section with a New synonyms to see label next to its title, and a carousel of suggested synonym sets — eyeliner, perfilador, lapiz de ojos; esmaltes, pintaúñas, laca de uñas — each with a + button and a trash button, and an arrow to see more" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Besides being created by hand, synonyms can come from <strong>AI SynonymBoost</strong>: an algorithm that looks for synonym patterns specific to the Store's configured industry and language, and suggests them automatically. Getting the industry setting right matters here, since a wrong one leads to irrelevant suggestions.</p>
              <p>Suggestions show up to 10 at a time in a carousel: clicking the <strong>"+"</strong> accepts one, and the trash icon rejects it. Once a decision is made, new suggestions are generated to replace it, with the newest ones always shown first.</p>

              <h3>Import/Export</h3>
              <p>The whole list of synonyms can also be imported or exported as a <strong>.csv</strong> file, with one set per line (e.g. <code>sneaker, trainer, shoe</code>).</p>`
          }
        ]
      },
      quiz: [
        {
          q: "A Store's feed has a product titled <strong>Leather Sofa</strong>. A user searches for \"couch\" and gets 0 results. Why?",
          options: [
            "The product is out of stock",
            "The product is indexed with a different term: \"couch\" doesn't appear anywhere in its data",
            "Searches with a single word never return results",
            "The product needs a group_id to be found"
          ],
          correct: 1,
          explain: "The product is indexed as \"sofa\", and the word \"couch\" doesn't appear anywhere in its data — so a search for \"couch\" can't find it, even though it means the same thing to the user. That's exactly the problem Synonyms helps fix."
        },
        {
          q: "What does the Synonyms feature do?",
          options: [
            "It renames products in the data feed",
            "It redirects a search to a specific URL",
            "It removes products from the Search Engine",
            "It associates an indexed term with another term, so that the other term gets indexed too"
          ],
          correct: 3,
          explain: "Synonyms associates an indexed term with another term, so the other term gets indexed too — without changing the data feed itself."
        },
        {
          q: "A product is titled <strong>Wool Jumper</strong>, and a Synonyms-type set <code>jumper, sweater</code> is created. It's as if the product were indexed as…",
          options: [
            "\"Wool Jumper Sweater\"",
            "\"Wool Sweater\"",
            "\"Wool Jumper\", unchanged",
            "\"Jumper Sweater\""
          ],
          correct: 0,
          explain: "The Synonyms type adds the other term to the indexed one, so both \"jumper\" and \"sweater\" now find the product — it's as if it were indexed as \"Wool Jumper Sweater\". Replacing \"jumper\" with \"sweater\" is what the Explicit Replacement type does."
        },
        {
          q: "A product is titled <strong>Wool Jumpers</strong>, and the synonym <code>jumper, sweater</code> is created. What happens when a user searches for \"sweater\"?",
          options: [
            "It finds the product, since jumper and jumpers are almost the same word",
            "It finds every product in the catalogue",
            "It doesn't find it, since \"jumper\" isn't indexed as such — only \"jumpers\" is",
            "It finds it, but only in Recommendations"
          ],
          correct: 2,
          explain: "The term the synonym is created from needs to be indexed exactly as it's written. The title says \"jumpers\", not \"jumper\", so the synonym isn't created for that product — just like \"Sports Shoes\" with the synonym sport, training."
        },
        {
          q: "A feed calls a category <strong>\"jumper\"</strong>, and never uses the word \"sweater\". Which Synonyms-type set is written correctly?",
          options: [
            "sweater, jumper",
            "jumper, sweater",
            "sweater => jumper",
            "Either order works the same way"
          ],
          correct: 1,
          explain: "The term the synonym is created from — the first one in the set — needs to be the one indexed exactly as written: \"jumper\". So jumper, sweater is correct, and sweater, jumper has them the wrong way round. sweater => jumper is an Explicit Replacement, not a Synonyms-type set."
        },
        {
          q: "An Explicit Replacement <code>jumper => sweater</code> is created for the <strong>Wool Jumper</strong>. What happens with the searches \"jumper\" and \"sweater\"?",
          options: [
            "Both find the product",
            "Neither finds the product",
            "\"jumper\" finds it, \"sweater\" doesn't",
            "\"sweater\" finds it, \"jumper\" doesn't anymore"
          ],
          correct: 3,
          explain: "Explicit Replacement replaces the indexed term with the other one: it's as if the product were indexed as \"Wool Sweater\". The original term, \"jumper\", stops working as a search term, and only \"sweater\" finds it."
        },
        {
          q: "A Store wants both \"mobile\" and \"cellphone\" to find its products titled with \"mobile\". Which type should it use?",
          options: [
            "Synonyms: mobile, cellphone",
            "Explicit Replacement: mobile => cellphone",
            "Explicit Replacement: cellphone => mobile",
            "None — only one term can ever find a product"
          ],
          correct: 0,
          explain: "With the Synonyms type both terms keep working, and \"mobile\", the indexed term, goes first. mobile => cellphone would make \"mobile\" stop working, and cellphone => mobile starts from a term that isn't indexed."
        },
        {
          q: "A Store selling kitchenware has its industry set to <strong>Fashion</strong> by mistake. What happens with AI SynonymBoost?",
          options: [
            "Nothing — AI SynonymBoost ignores the industry setting",
            "Its suggestions are likely to be irrelevant, since it looks for synonym patterns specific to the configured industry and language",
            "It stops suggesting synonyms altogether",
            "It accepts every suggestion automatically"
          ],
          correct: 1,
          explain: "AI SynonymBoost looks for synonym patterns specific to the Store's configured industry and language, so a wrong industry leads to irrelevant suggestions. Suggestions are never accepted automatically: each one is accepted with \"+\" or rejected with the trash icon."
        },
        {
          q: "Which of these is written as an Explicit Replacement?",
          options: [
            "mobile, cellphone",
            "mobile; cellphone",
            "mobile => cellphone",
            "mobile + cellphone"
          ],
          correct: 2,
          explain: "Explicit Replacement is written as Term1 => Term2. A comma-separated list, like mobile, cellphone, is the Synonyms type."
        }
      ]
    },
    {
      id: 5,
      code: "5",
      moduleTag: "Module 1 Section 3",
      navGroup: "COPY SETTINGS",
      navLabel: "Copy Settings",
      eyebrow: "5. COPY SETTINGS",
      title: "Copy Settings",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/test-your-search-engine/copy-settings",
      theory: {
        lead: "Every feature seen so far that shapes search results — such as <strong>Search Fields</strong>, <strong>Custom Results</strong> or <strong>Synonyms</strong> — is configured at Search Engine level. <strong>Copy Settings</strong> lets that configuration be duplicated from one Search Engine to another within the same Store, instead of rebuilding it by hand every time.",
        blocks: [
          {
            html: `
              <p>There are two more features that can be copied from one Search Engine to another — <strong>Redirections</strong> and <strong>Banners</strong>. They don't affect search results, and they're covered later in this section.</p>

              <h3>Before Copying</h3>
              <p>Before copying anything, it's worth checking that <strong>product names</strong> and the two Search Engines' <strong>languages</strong> actually match between source and destination — a mismatched value may simply not be recognized once it lands on the target Search Engine.</p>

              <h3>How to Use It</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 400px; max-width: 55%;">
                  <img src="img/copy-settings-dialog.png" alt="Copy Settings confirmation dialog after clicking Apply, showing the choice between Copy and Add to Existing Settings and Copy and Replace Existing Settings" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Using it means clicking <strong>"Copy Settings to…"</strong>, usually found at the top of a configuration's list (Custom Results, Banners, Redirections, Synonyms and so on each have their own). From there:</p>
                  <ol>
                    <li>Pick the destination Search Engine(s) from the dropdown.</li>
                    <li>Click <strong>"Apply"</strong>.</li>
                    <li>Choose one of two options in the confirmation dialog that appears.</li>
                    <li>Click <strong>"Yes, apply"</strong> to save the changes.</li>
                  </ol>

              <h3>Add or Replace</h3>
              <p>The confirmation dialog offers two very different options:</p>
              <table class="theory-table">
                <thead><tr><th>Option</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><strong>Copy and Add to Existing Settings</strong></td><td>Adds the source Search Engine's configuration on top of the destination's, leaving whatever was already there untouched.</td></tr>
                  <tr><td><strong>Copy and Replace Existing Settings</strong></td><td>Overwrites the destination's configuration entirely, deleting its original settings.</td></tr>
                </tbody>
              </table>
              <p class="theory-callout">That second option is worth treating with real caution: once a <strong>Replace</strong> has been applied, <strong>it can't be undone</strong>, and the destination's original settings can't be recovered.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What does Copy Settings let you do?",
          options: [
            "Merge two Stores into one",
            "Change a Search Engine's language automatically",
            "Copy an entire data feed to a new Store",
            "Duplicate a configuration set from one Search Engine to another within the same Store"
          ],
          correct: 3,
          explain: "Copy Settings duplicates a configuration — like Custom Results or Synonyms — from one Search Engine onto another, within the same Store."
        },
        {
          q: "Which of these can Copy Settings duplicate?",
          options: [
            "The Store's Authorized Domains only",
            "The Store ID and Hash ID",
            "Custom Results, Banners, Redirections, Synonyms, Filters and Search Fields",
            "The data feed's file format"
          ],
          correct: 2,
          explain: "Copy Settings covers configuration sets like Custom Results, Banners, Redirections, Synonyms, Filters and Search Fields."
        },
        {
          q: "What should be checked before copying settings between two Search Engines?",
          options: [
            "That both Search Engines share the same Hash ID",
            "That product names and the two Search Engines' languages match",
            "That the Store's currency is set to USD",
            "That the CSS selector is identical on both"
          ],
          correct: 1,
          explain: "Mismatched product names or languages between source and destination may not be recognized once copied over — it's worth checking both first."
        },
        {
          q: "Where is the \"Copy Settings to…\" option usually found?",
          options: [
            "Inside the Security Settings screen",
            "Only in the installation script",
            "Inside the Results Preview panel",
            "At the top of a configuration's list, like Custom Results or Synonyms"
          ],
          correct: 3,
          explain: "\"Copy Settings to…\" is typically found at the top of the relevant configuration's list."
        },
        {
          q: "What are the two options offered in the confirmation dialog after clicking Apply?",
          options: [
            "Copy Now, or Copy Later",
            "Copy and Add to Existing Settings, or Copy and Replace Existing Settings",
            "Export as CSV, or Export as XML",
            "Enable, or Disable"
          ],
          correct: 1,
          explain: "The dialog offers a choice between adding the copied settings on top of the existing ones, or replacing them entirely."
        },
        {
          q: "What does \"Copy and Add to Existing Settings\" do?",
          options: [
            "Deletes every setting on the destination Search Engine",
            "Only copies Search Fields, nothing else",
            "Adds the source's settings on top of the destination's, keeping what was already there",
            "Requires deleting the source Search Engine afterward"
          ],
          correct: 2,
          explain: "This option layers the copied configuration on top of the destination's existing settings, without touching what was already there."
        },
        {
          q: "What does \"Copy and Replace Existing Settings\" do?",
          options: [
            "It overwrites the destination's configuration entirely, deleting its original settings",
            "Nothing changes on the destination Search Engine",
            "It only replaces Banners, never other settings",
            "It asks for a second confirmation the next day"
          ],
          correct: 0,
          explain: "Replace overwrites the destination Search Engine's configuration completely, deleting whatever was configured there before."
        },
        {
          q: "Can a \"Copy and Replace Existing Settings\" action be undone afterward?",
          options: [
            "Yes, at any time from the Reset button",
            "Only within 24 hours",
            "Only if the source Search Engine still exists",
            "No — once applied, the original settings can't be recovered"
          ],
          correct: 3,
          explain: "Once a Replace has been applied, it can't be undone, and the destination's original settings can't be recovered — so it's worth using with real caution."
        }
      ]
    },
    {
      id: 6,
      code: "6",
      moduleTag: "Module 1 Section 3",
      navGroup: "REDIRECTIONS",
      navLabel: "Redirections",
      eyebrow: "6. REDIRECTIONS",
      title: "Redirections",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/optimize/redirections",
      theory: {
        lead: "A <strong>Redirection</strong> sends users from the Search Layer straight to a chosen URL whenever they search for a specific term — instead of showing them a results page at all.",
        blocks: [
          {
            html: `
              <figure class="lesson-figure lesson-figure-right" style="width: 400px; max-width: 55%;">
                  <img src="img/redirections-add-form.png" alt="Add redirection form with Redirection name, Status toggle, Destination URL, a search term set to Broad Match, and the Enable automatic redirection checkbox" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>A redirection takes a user from the <strong>Search Layer</strong> to another page, specified by a URL, the moment they type a given search term.</p>
                  <p>It's a way to surface information that doesn't live in the catalogue itself — a privacy policy, a contact page, a company or blog page, or a campaign landing page tied to a brand or a season (Black Friday, a sale, Christmas, and so on).</p>

              <h3>Creating a Redirection</h3>
              <p>Creating one means filling in:</p>
              <table class="theory-table">
                <thead><tr><th>Field</th><th>What it's for</th></tr></thead>
                <tbody>
                  <tr><td><strong>Redirection name</strong></td><td>To identify it later.</td></tr>
                  <tr><td><strong>Status</strong> toggle</td><td>To enable or disable it.</td></tr>
                  <tr><td><strong>Destination URL</strong></td><td>The page it points to.</td></tr>
                  <tr><td><strong>Search terms</strong></td><td>One or more search terms that trigger it, each set to either <strong>Exact Match</strong> (only that exact term triggers it) or <strong>Broad Match</strong> (triggers as soon as the typed text contains that term).</td></tr>
                  <tr><td><strong>"Enable automatic redirection"</strong> checkbox</td><td>Leave it unchecked and the redirection only fires once the user presses enter or actually searches; check it and it happens automatically, as soon as the matching term is typed in.</td></tr>
                </tbody>
              </table>

              <h3>Managing Redirections</h3>
              <p class="theory-callout">Each Search Engine can hold up to <strong>100 redirections</strong>.</p>
              <p>Once saved, they show up in a list where each one can be activated or deactivated, edited or deleted from its three-dot menu — and the list itself can be searched, or filtered by date or by status, to make finding a specific one easier as the list grows.</p>
              <p>A set of redirections can also be copied over to another Search Engine using the "Copy settings to..." dropdown next to the "Add redirection" button, followed by "Apply".</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What does a Redirection do?",
          options: [
            "It removes a product from the results entirely",
            "It sends the user to a specific URL when they search for a given term",
            "It renames a search term inside the data feed",
            "It highlights a product with a banner"
          ],
          correct: 1,
          explain: "A redirection takes a user from the Search Layer to another page, specified by a URL, when they type a given search term."
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
            "Converting a product's currency",
            "Blocking a visitor's IP address",
            "Mapping a feed field to a normalized field name",
            "Pointing a search term to a privacy policy or contact page"
          ],
          correct: 3,
          explain: "Redirections are useful for things like a privacy policy, a contact page, or a campaign landing page — information that doesn't live in the catalogue itself."
        },
        {
          q: "What's the difference between Exact Match and Broad Match on a redirection's search terms?",
          options: [
            "They behave identically",
            "Exact Match only triggers on the exact term; Broad Match triggers when the typed text contains it",
            "Broad Match only works on mobile",
            "Exact Match applies to brands, Broad Match to categories"
          ],
          correct: 1,
          explain: "Exact Match only triggers on that exact term, while Broad Match triggers as soon as the typed text contains it."
        },
        {
          q: "What happens if \"Enable automatic redirection\" is left unchecked?",
          options: [
            "The redirection never fires",
            "The redirection fires on every keystroke",
            "The redirection only fires once the user presses enter or actually searches",
            "The redirection is disabled entirely until re-saved"
          ],
          correct: 2,
          explain: "Left unchecked, the redirection only fires once the user presses enter or searches; checked, it fires automatically as the matching term is typed."
        },
        {
          q: "How many redirections can a single Search Engine hold?",
          options: ["10", "1,000", "Unlimited", "100"],
          correct: 3,
          explain: "Each Search Engine can hold up to 100 redirections."
        },
        {
          q: "How can a set of redirections be applied to a different Search Engine?",
          options: [
            "Using the \"Copy settings to...\" dropdown, then Apply",
            "By re-typing them manually on the other Search Engine",
            "It's not possible — redirections are Search Engine-specific only",
            "By exporting and re-importing the data feed"
          ],
          correct: 0,
          explain: "The \"Copy settings to...\" dropdown next to \"Add redirection\" lets a set of redirections be applied to another Search Engine, followed by Apply."
        },
        {
          q: "Where can an existing redirection be activated, deactivated, edited or deleted?",
          options: [
            "Only by contacting <strong>Doofinder</strong> support",
            "From the Field Name Mapping screen",
            "From its three-dot menu in the redirections list",
            "It can't be changed once saved"
          ],
          correct: 2,
          explain: "Each redirection in the list can be activated, deactivated, edited or deleted from its three-dot menu."
        }
      ]
    },
    {
      id: 7,
      code: "7",
      moduleTag: "Module 1 Section 3",
      navGroup: "BANNERS",
      navLabel: "Banners",
      eyebrow: "7. BANNERS",
      title: "Banners",
      hasQuiz: true,
      docUrl: "https://support.doofinder.com/search/promotional-tools/banners",
      theory: {
        lead: "<strong>Banners</strong> make it possible to promote a specific product or a marketing campaign right inside the Search Layer's results, triggered by chosen search terms.",
        blocks: [
          {
            html: `
              <figure class="lesson-figure lesson-figure-right" style="width: 400px; max-width: 55%;">
                  <img src="img/banners-add-form.png" alt="Add Banner form with Name, Status, Default Banner toggle, an optional Duration date range, search terms, and image and Target link fields" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Banners can be shown for specific search terms, during a chosen time period, or set as the default banner shown across every other search.</p>
                  <p>Setting one up means filling in:</p>
                  <ul>
                    <li>A <strong>Name</strong>, to tell it apart from the others.</li>
                    <li>A <strong>Status</strong> checkbox, to enable or disable it without deleting it.</li>
                    <li>Whether it's the <strong>Default Banner</strong> — the one shown for every search term that isn't otherwise covered.</li>
                    <li>An optional <strong>Duration</strong>, a date range the banner is limited to.</li>
                    <li>Its search terms, each set to Exact Match (triggers only on that exact term) or Broad Match (triggers whenever the typed text contains it) — unless it's the default banner, which ignores search terms altogether.</li>
                  </ul>
              <p class="theory-callout">Only one banner can be default at a time; marking a new one as default automatically un-defaults whichever one held that spot before.</p>

              <h3>The Banner's Visuals</h3>
              <p>The banner's visuals are set in one of two ways:</p>
              <table class="theory-table">
                <thead><tr><th>Option</th><th>How it works</th></tr></thead>
                <tbody>
                  <tr><td><strong>Manual fields</strong></td><td>Uploading an image (or pasting a URL directly), a <strong>Target link</strong> for where a click should lead, and an "Open in new window" checkbox.</td></tr>
                  <tr><td><strong>HTML code</strong></td><td>For full control, hand-written HTML code, which overrides those manual fields entirely and requires knowing HTML to use.</td></tr>
                </tbody>
              </table>
              <p>An uploaded image needs to meet these requirements:</p>
              <table class="theory-table">
                <thead><tr><th>Requirement</th><th>Value</th></tr></thead>
                <tbody>
                  <tr><td>Format</td><td>.jpg, .jpeg, .gif or .png</td></tr>
                  <tr><td>Maximum size</td><td>150 KB</td></tr>
                  <tr><td>Recommended size (desktop)</td><td>Roughly 150×500–800 pixels</td></tr>
                  <tr><td>Recommended size (mobile)</td><td>640×100 pixels</td></tr>
                </tbody>
              </table>
              <p>The sizes are only what <strong>Doofinder</strong> recommends — a banner can be sized however best fits the Layer it's shown in. As with most configuration screens, remember to actually click Save before navigating away.</p>

              <h3>Editing and Deleting</h3>
              <p>Existing banners can be edited by clicking their name, or through the three-dot menu, which also offers duplicate and delete; deleting instead works by ticking a banner's checkbox and confirming with the red delete button that appears.</p>`
          },
          {
            heading: "Banner Performance",
            pageBreak: true,
            html: `
              <figure class="lesson-figure lesson-figure-left" style="width: 440px; max-width: 55%;">
                  <img src="img/banners-list-metrics.png" alt="Banners list showing Name, search terms, Impressions, Clicks, CTR, active date period, Status, and a star marking the current default banner" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>The Banners list shows, per banner:</p>
              <table class="theory-table" style="clear: none; width: auto;">
                    <thead><tr><th>Column</th><th>What it shows</th></tr></thead>
                    <tbody>
                      <tr><td><strong>Name</strong></td><td>The banner's name</td></tr>
                      <tr><td><strong>Search terms</strong></td><td>The search terms that trigger it</td></tr>
                      <tr><td><strong>Impressions</strong></td><td>Counted once per minute, regardless of how many times it actually appeared in that window</td></tr>
                      <tr><td><strong>Clicks</strong></td><td>Its clicks</td></tr>
                      <tr><td><strong>CTR</strong></td><td>Click-through rate</td></tr>
                      <tr><td><strong>Date period</strong></td><td>The active date period</td></tr>
                      <tr><td><strong>Status</strong></td><td>Enabled, only if its search terms are matching, or disabled</td></tr>
                      <tr><td><strong>⭐</strong></td><td>Marks whichever banner is currently the default</td></tr>
                    </tbody>
                  </table>`
          }
        ]
      },
      quiz: [
        {
          q: "What are Banners used for?",
          options: [
            "Blocking bot traffic by IP",
            "Promoting a specific product or marketing campaign inside the search results",
            "Mapping feed fields to normalized field names",
            "Generating search suggestions automatically"
          ],
          correct: 1,
          explain: "Banners let you promote certain products or marketing campaigns right inside the search results."
        },
        {
          q: "How many banners can be set as default at the same time?",
          options: ["Up to three", "One per search term", "Unlimited", "Only one"],
          correct: 3,
          explain: "Only one banner can be set as default — marking a new one as default automatically un-defaults the previous one."
        },
        {
          q: "What happens when a new banner is marked as Default?",
          options: [
            "The previous default banner is automatically unset",
            "Nothing changes for other banners",
            "All other banners are deleted",
            "The new banner's search terms are ignored"
          ],
          correct: 0,
          explain: "Whenever a banner is set as default, the previous one (if it exists) is automatically unset."
        },
        {
          q: "What overrides a banner's manual image and link fields?",
          options: ["The Duration field", "The Default Banner toggle", "Hand-written HTML code", "The three-dot menu"],
          correct: 2,
          explain: "Using HTML code to build or customize a banner overrides the manual fields, and requires knowing HTML to use."
        },
        {
          q: "What's the maximum file size for an uploaded banner image?",
          options: ["50 KB", "500 KB", "1 MB", "150 KB"],
          correct: 3,
          explain: "An uploaded banner image can be at most 150 KB, in .jpg, .jpeg, .gif or .png format."
        },
        {
          q: "Is the recommended banner size (e.g. 150×500–800px for desktop) mandatory?",
          options: [
            "No, it's only a recommendation — a banner can be sized to fit its Layer",
            "Yes, uploads outside that size are rejected",
            "Only for the default banner",
            "Only on mobile"
          ],
          correct: 0,
          explain: "The recommended dimensions aren't mandatory — banners can be sized however best fits the Layer they're shown in."
        },
        {
          q: "How are a banner's Impressions counted in the main panel?",
          options: [
            "Once per click",
            "Once per minute, regardless of how many times it actually appeared",
            "Once per <strong>Doofinder</strong> account, ever",
            "They aren't tracked at all"
          ],
          correct: 1,
          explain: "Impressions are counted once per minute, regardless of the actual number of occurrences in that window."
        },
        {
          q: "What does the star (⭐) symbol indicate in the Banners list?",
          options: [
            "That the banner is currently set as default",
            "That the banner has the highest CTR",
            "That the banner uses HTML code",
            "That the banner is disabled"
          ],
          correct: 0,
          explain: "The star marks whichever banner is currently set as the default one, shown for every other search term."
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
      hasQuiz: true,
      quizLabel: "Guided Exercise",
      exerciseType: "wizard",
      theory: {
        lead: "Time to work through Amanda's list! This final exercise brings Doostride's search back into shape before she's home. These are the things you'll need to sort out:",
        blocks: [
          {
            html: `
              <ul>
                <li>Figure out why the shoe variants aren't grouping into a single result, and fix the data feed behind it.</li>
                <li>Exclude the discontinued Kids line from search entirely.</li>
                <li>Make "sneakers" and "trainers" return the same results.</li>
                <li>Set up redirections so "return policy" and "contact us" land on the right page.</li>
                <li>Get a Black Friday banner live, pointing to the campaign page.</li>
                <li>Mirror the finished setup on the Spanish Search Engine.</li>
              </ul>
              <p>Work through each step the same way you would in the real Doofinder Admin Panel — that will help you choose the right answers, and you'll actually need to do them for real to finalize all the steps of the exercise.</p>`
          }
        ]
      },
      exercise: {
        lead: `You reread Amanda's message on Slack and start working through her list, one task at a time.</p>
          <ul>
            <li>Figure out why Doostride's shoe variants aren't grouping into a single result.</li>
            <li>Make sure discontinued Doostride Kids products stop showing up in search.</li>
            <li>Make "sneakers" and "trainers" return the same results.</li>
            <li>Set up redirections so "return policy" and "contact us" searches land on the right page.</li>
            <li>Get a Black Friday banner live, pointing users to the campaign page.</li>
            <li>Mirror the finished setup on the Spanish Search Engine.</li>
          </ul>`,
        doneNote: "Doostride's search is clean and grouped again — Kids products are gone, sneakers and trainers behave the same, the right pages come up instantly, Black Friday is ready to go, and the Spanish storefront now matches too.",
        replyButtonLabel: "Reply to Amanda",
        phases: [
          {
            key: "grouping-diagnosis",
            title: "1. Grouping Product Variants — Part 1",
            question: "Amanda already enabled <strong>\"Group variants as a single item\"</strong> on the English Search Engine a while ago — the setting shown below has been on for weeks.",
            scenarioImage: { src: "img/final-grouping-toggle-on.png", alt: "Indices Configuration section showing the 'Group variants as a single item' toggle already switched on" },
            mediumMedia: true,
            scenario: "Yet every size of the AXEL RUNNER shoe still shows up as a separate result in the Search Layer.</p><p class=\"exercise-scenario-text\">What's the most likely reason grouping still isn't working?",
            fields: [
              { key: "reason", label: "", type: "choice", layout: "column", options: [
                "The variants in the data feed don't all share the same group_id, or none of them sets group_leader",
                "The Search Engine needs to be deleted and recreated from scratch",
                "Grouping only works when indexing via API, never via File or URL",
                "The CSS Selector needs to include a comma-separated mobile selector"
              ], correct: "The variants in the data feed don't all share the same group_id, or none of them sets group_leader" }
            ],
            explain: "Turning the toggle on only switches grouping on — it still depends entirely on the feed itself: every variant of the same product needs to share the exact same group_id, and ideally one of them needs group_leader set to true. Recreating the Search Engine, the indexing method, and the CSS Selector have nothing to do with how grouping resolves, so none of them would fix this."
          },
          {
            key: "grouping-feed",
            title: "1. Grouping Product Variants — Part 2",
            question: "You go check the data feed and find two other versions of the whole catalogue floating around from an earlier attempt at grouping.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze the 3 full data feeds below and figure out which one actually gets the AXEL RUNNER's variants — and every other product's — to group correctly.",
            beforeFields: `
              <div class="feed-preview-grid">
                <div class="feed-preview-card" style="flex-basis: 0; min-width: 200px;">
                  <p class="feed-preview-label">Data feed 1</p>
                  <img src="img/final-group-feed1-preview.png" alt="Preview of the full catalogue feed: id, title, price, color, size and the rest of the usual columns — no group_id or group_leader column at all" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-group-feed-1.csv" download class="btn btn-ghost feed-download-btn">Download data feed 1</a>
                </div>
                <div class="feed-preview-card" style="flex-basis: 0; min-width: 200px;">
                  <p class="feed-preview-label">Data feed 2</p>
                  <img src="img/final-group-feed2-preview.png" alt="Preview of the full catalogue feed with a group_id column added, but spelled differently on each row of the same product — for AXEL RUNNER: 7841002000, 78410020000, 784100200 — and an empty group_leader column" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-group-feed-2.csv" download class="btn btn-ghost feed-download-btn">Download data feed 2</a>
                </div>
                <div class="feed-preview-card" style="flex-basis: 0; min-width: 200px;">
                  <p class="feed-preview-label">Data feed 3</p>
                  <img src="img/final-group-feed3-preview.png" alt="Preview of the full catalogue feed with a group_id column set to the group leader's own id on every row of that group — for AXEL RUNNER: 7841002000 on all 5 rows — and group_leader set to true on exactly the leader row, false on the rest" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-group-feed-3.csv" download class="btn btn-ghost feed-download-btn">Download data feed 3</a>
                </div>
              </div>
              <p class="theory-lead" style="margin-bottom:16px;">Choose the correct one:</p>`,
            fields: [
              { key: "validfeed", label: "", type: "choice", layout: "column", options: ["Data feed 1", "Data feed 2", "Data feed 3"], correct: "Data feed 3" }
            ],
            explain: "Data feed 3 is the only one that works: every variant of a product shares the exact same group_id — its group leader's own id (for AXEL RUNNER, the leader is id 7841002000, so all 5 rows carry group_id 7841002000) — and exactly one row per group has group_leader set to true, so Doofinder knows which one to show first. Data feed 1 doesn't have a group_id column at all, so Doofinder has no way to know which rows belong together. Data feed 2 does have a group_id column, but each row's value is spelled slightly differently (7841002000, 78410020000, 784100200 for AXEL RUNNER alone) — since the values don't match exactly, Doofinder treats them as different groups, so nothing actually groups together."
          },
          {
            key: "excluded-results-kids",
            title: "2. Excluded Results",
            question: "Doostride discontinued its entire <strong>Kids</strong> line last month, but a customer just complained about finding a Kids product in a search.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Choose the right way to make sure none of them show up again:",
            scenarioImage: { src: "img/final-kids-still-showing.png", alt: "Search Layer results for a query still showing a Doostride Kids product, despite the Kids line being discontinued" },
            smallMedia: true,
            fields: [
              { key: "method", label: "", type: "choice", layout: "column", options: [
                "Add an Excluded Results rule: gender is Kids",
                "Add each Kids product individually to Excluded Results, one by one",
                "Delete the Kids products from the data feed entirely",
                "Add a Redirection for the term \"kids\""
              ], correct: "Add an Excluded Results rule: gender is Kids" }
            ],
            explain: "Since it's a whole discontinued line rather than one or two items, a rule is the right tool: gender is Kids excludes every product tagged for that audience at once — whatever its category, whether shoes, apparel or accessories — and keeps working automatically if a Kids item is ever re-added by mistake. Excluding them one by one would work today but wouldn't cover anything added later, and it's more manual work than a single rule. Deleting them from the feed is unnecessary and riskier, since the same feed may be used elsewhere. A Redirection only fires for a search term typed by a user — it has nothing to do with products that already appear inside other, unrelated searches."
          },
          {
            key: "synonyms-sneakers",
            title: "3. Synonyms",
            question: "Searching <strong>\"trainers\"</strong> currently returns no results at all: Doostride's own catalogue always calls this category <strong>\"sneakers\"</strong> (that's the word used in the feed's own <code>category</code> and <code>title</code> fields), and the word \"trainers\" never appears in it.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Choose the synonym configuration that fixes this without breaking the existing \"sneakers\" searches:",
            fields: [
              { key: "synonymtype", label: "", type: "choice", layout: "column", options: [
                "A Synonyms-type set: sneakers, trainers",
                "A Synonyms-type set: trainers, sneakers",
                "An Explicit Replacement set: sneakers => trainers",
                "A Redirection pointing \"trainers\" to the sneakers category page"
              ], correct: "A Synonyms-type set: sneakers, trainers" }
            ],
            explain: "A Synonyms-type set lists the terms as an equivalent group rather than swapping one for the other — searching either sneakers or trainers then returns the exact same results. For it to work, the first term listed has to be the one that actually exists in the feed, which is sneakers here, so sneakers, trainers is correct — trainers, sneakers has them the wrong way round. An Explicit Replacement set (sneakers => trainers) would substitute the feed's own working term for one that doesn't exist in the feed at all, breaking every \"sneakers\" search that used to work. A Redirection isn't the right tool either — it sends users away from the Search Layer to a URL, it doesn't make two search terms return the same results."
          },
          {
            key: "redirections-support-pages",
            title: "4. Redirections",
            question: "Amanda also wants a search to skip the results page entirely and go straight to the page users are actually looking for: <strong>\"return policy\"</strong> should land on Doostride's returns page.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Set up that redirection — choose the right configuration for each of the following:",
            fields: [
              { key: "matchtype", label: "Which match type should \"return policy\" use?", type: "select", options: ["Exact Match", "Broad Match"], correct: "Broad Match" },
              { key: "auto", label: "Should \"Enable automatic redirection\" be checked?", type: "select", options: ["Yes, check it", "No, leave it unchecked"], correct: "No, leave it unchecked" },
              { key: "url", label: "Destination URL", type: "text", freeform: true }
            ],
            explain: "Broad Match is the safer choice for a full phrase like this — it also catches close variants such as \"what's your return policy\" or \"return policy for shoes\", where Exact Match would only trigger on that exact wording. Leaving \"Enable automatic redirection\" unchecked means the redirect only fires once the user actually searches, instead of pulling them away mid-keystroke while they might still be typing something else entirely."
          },
          {
            key: "banners-black-friday",
            title: "5. Banners",
            question: "Black Friday is coming up, and Amanda wants a banner live for it, linking to Doostride's campaign landing page.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze the 3 banner configurations below and choose the one that actually does what Amanda wants:",
            fields: [
              { key: "correctbanner", type: "image-select", layout: "column", thumbCols: 3, mediaWidth: 800, options: [
                { value: "a", src: "img/final-banner-a.png", alt: "Add Banner form for 'BLACK FRIDAY', with the Default Banner toggle turned on instead of search terms, and Target link set to the Black Friday landing page", caption: "Option A" },
                { value: "b", src: "img/final-banner-b.png", alt: "Add Banner form for 'BLACK FRIDAY' with the search term black friday set to Exact Match, and Target link set to the Black Friday landing page", caption: "Option B" },
                { value: "c", src: "img/final-banner-c.png", alt: "Add Banner form for 'BLACK FRIDAY' with the search term black friday set to Broad Match, a Duration covering the Black Friday weekend, and Target link set to the Black Friday landing page", caption: "Option C" }
              ], correct: "c" }
            ],
            explain: "Option C is correct: Broad Match on \"black friday\" also catches close searches like \"black friday sale\" or \"black friday deals\", it's scoped to a Duration instead of running forever, and it isn't marked Default, so it only shows for those searches rather than every single one. Option A marks it as the Default Banner, which ignores search terms entirely and would show the Black Friday banner on every search, not just Black Friday ones. Option B uses Exact Match, so it would only fire on the literal phrase \"black friday\" and miss every close variant."
          },
          {
            key: "copy-settings-spanish",
            title: "6. Copy Settings",
            question: "With English sorted, Amanda wants the exact same Excluded Results, Synonyms, Redirections and Banners mirrored on the <strong>Spanish</strong> Search Engine — but the Spanish Search Engine already has its own Spanish-language redirection for \"política de privacidad\" that needs to stay untouched.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Choose the right Copy Settings option:",
            fields: [
              { key: "copymode", label: "", type: "choice", layout: "column", options: [
                "Copy and Add to Existing Settings",
                "Copy and Replace Existing Settings"
              ], correct: "Copy and Add to Existing Settings" }
            ],
            explain: "Add to Existing Settings layers the English configuration on top of whatever the Spanish Search Engine already has, so the existing política de privacidad redirection survives untouched. Replace would wipe out the Spanish Search Engine's configuration entirely before applying the copy — including that existing redirection — and, as covered in the lesson, a Replace can't be undone afterward."
          }
        ],
        replySlack: {
          name: "Samantha Garden",
          channel: "amanda-samantha",
          self: true,
          body: [
            "Hey Amanda, hope you're enjoying the break! 🌴",
            "Quick update before you're back: variants are grouping properly now — a couple of the size variants had a typo in group_id, so I swapped in a clean feed and set a group_leader on each product.",
            "Also excluded the whole Kids line, merged \"sneakers\" and \"trainers\" into one synonym set, and set up the redirection for \"return policy\".",
            "Black Friday banner is live too, and I copied everything over to the Spanish Search Engine — added it on top, so your política de privacidad redirection is still exactly where you left it.",
            "Enjoy the rest of your vacation, see you soon!"
          ],
          times: ["11:02", "11:02", "11:03", "11:04", "11:04"]
        }
      }
    }
  ]
};
