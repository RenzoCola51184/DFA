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
                "Searching \"return policy\" or \"contact us\" just shows a results page full of nothing useful — those searches should take people straight to the right page.",
                "And Black Friday is coming up fast — there's nothing in the search pointing people to the campaign page yet."
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
              <p>There are two more features that can be copied from one Search Engine to another — <strong>Redirections</strong> and <strong>Banners</strong>. They don't affect search results, and they're covered later in this section. Altogether, the sets that can be copied are <strong>Custom Results</strong>, <strong>Banners</strong>, <strong>Redirections</strong>, <strong>Synonyms</strong>, <strong>Filters</strong> and <strong>Search Fields</strong>.</p>

              <h3>Before Copying</h3>
              <p>Before copying anything, it's worth checking that <strong>product names</strong> and the two Search Engines' <strong>languages</strong> actually match between source and destination — a mismatched value may simply not be recognized once it lands on the target Search Engine. For example, a synonym set like <code>sneakers, trainers</code> copied from an English Search Engine to a Spanish one may not be considered, since the Spanish products aren't indexed with those English terms.</p>

              <h3>How to Use It</h3>
              <figure class="lesson-figure lesson-figure-right gif-image" style="width: 460px; max-width: 55%;">
                  <img src="img/copy-settings-flow.gif" data-base-src="img/copy-settings-flow.gif" alt="Animation of Copy Settings in the Synonyms list: the Copy Settings to... dropdown opens next to Add Synonym, one Search Engine of the Store (DE) is ticked, Apply is clicked, the Copy settings mode pop-up appears with Copy and Add to Existing Settings selected, and Yes, apply is clicked" data-action="zoom-image">
                  <canvas class="gif-freeze-canvas"></canvas>
                  <button type="button" class="gif-toggle-btn" data-action="toggle-gif" aria-label="Pause animation"><svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><rect x="3" y="2" width="3.4" height="12" rx="1"></rect><rect x="9.6" y="2" width="3.4" height="12" rx="1"></rect></svg></button>
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Using it means clicking <strong>"Copy Settings to…"</strong>, usually found at the top of a configuration's list (Custom Results, Banners, Redirections, Synonyms and so on each have their own — in Synonyms, it sits next to the "Add Synonym" button). From there:</p>
              <ol>
                <li>Pick the destination Search Engine(s) from the dropdown — one, several, or all of them with "Select all".</li>
                <li>Click <strong>"Apply"</strong>.</li>
                <li>Choose one of two options in the <strong>Copy settings mode</strong> pop-up that appears.</li>
                <li>Click <strong>"Yes, apply"</strong> to save the changes.</li>
              </ol>

              <h3>Add or Replace</h3>
              <p>The pop-up offers two very different options:</p>
              <table class="theory-table">
                <thead><tr><th>Option</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><strong>Copy and Add to Existing Settings</strong></td><td>Adds all the source Search Engine's sets on top of the destination's. The sets already created in the destination Search Engine remain untouched.</td></tr>
                  <tr><td><strong>Copy and Replace Existing Settings</strong></td><td>Replaces all the sets in the destination Search Engine with the source's. The sets already created in the destination Search Engine are deleted.</td></tr>
                </tbody>
              </table>
              <figure class="lesson-figure lesson-figure-left" style="width: 360px; max-width: 55%;">
                  <img src="img/copy-settings-mode-dialog.png" alt="Copy settings mode pop-up with the heading Choose how you want to copy settings between Search Engines and two options: Copy and Add to Existing Settings (selected) — This option will merge settings from the source Search Engine with the existing items in the destination Search Engine — and Copy and Replace Existing Settings — This option will overwrite all existing items in the destination Search Engine with those from the source Search Engine — plus Cancel and Yes, apply buttons" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>The pop-up describes each option: Add merges the settings from the source Search Engine with the existing items in the destination, while Replace overwrites all the existing items in the destination with those from the source.</p>
              <p class="theory-callout">That second option is worth treating with real caution: once a <strong>Replace</strong> has been applied, <strong>it can't be undone</strong>, and the destination's original settings can't be recovered.</p>

              <h3>An Example</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 400px; max-width: 55%;">
                  <img src="img/copy-settings-example-before.png" alt="Two Synonyms lists side by side: Search Engine A (source) with the synonym sets sneakers, trainers and hoodie, sweatshirt; and Search Engine B (destination) with the synonym set pants, trousers" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>A Store has two Search Engines, A and B, both in English and with the same products. Search Engine A has two synonym sets, <code>sneakers, trainers</code> and <code>hoodie, sweatshirt</code>, while Search Engine B has one of its own, <code>pants, trousers</code>.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-left" style="width: 420px; max-width: 55%;">
                  <img src="img/copy-settings-example-after.png" alt="Search Engine B's Synonyms list in two versions: after Copy and Add to Existing Settings, with pants, trousers, sneakers, trainers and hoodie, sweatshirt; and after Copy and Replace Existing Settings, with only sneakers, trainers and hoodie, sweatshirt" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>From Search Engine A's Synonyms list, "Copy Settings to…" is used to pick Search Engine B, followed by "Apply". What Search Engine B ends up with depends on the option chosen in the pop-up.</p>
              <p>With Add, Search Engine B lists three sets: its own <code>pants, trousers</code> plus the two copied from Search Engine A. With Replace, it lists only the two sets copied from Search Engine A — <code>pants, trousers</code> has been deleted, and there's no way to get it back.</p>
              <table class="theory-table">
                <thead><tr><th>Option</th><th>Search Engine B's synonyms afterwards</th><th>Search Engine B's own set</th></tr></thead>
                <tbody>
                  <tr><td><strong>Copy and Add to Existing Settings</strong></td><td><code>pants, trousers</code>, <code>sneakers, trainers</code>, <code>hoodie, sweatshirt</code></td><td>Kept</td></tr>
                  <tr><td><strong>Copy and Replace Existing Settings</strong></td><td><code>sneakers, trainers</code>, <code>hoodie, sweatshirt</code></td><td>Deleted — it can't be recovered</td></tr>
                </tbody>
              </table>`
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
            "Duplicate a configuration from one Search Engine to another within the same Store"
          ],
          correct: 3,
          explain: "Copy Settings duplicates a configuration — like Custom Results or Synonyms — from one Search Engine onto another, within the same Store. It doesn't touch data feeds, doesn't work across Stores, and doesn't change a Search Engine's language."
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
          explain: "The sets that can be copied are Custom Results, Banners, Redirections, Synonyms, Filters and Search Fields — Search Engine configuration, not Store-level details like domains or IDs, and not the data feed."
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
          explain: "A copied value that doesn't match the destination may not be recognized there, so product names and the two Search Engines' languages are worth checking first. The other options have nothing to do with Copy Settings."
        },
        {
          q: "Where is the \"Copy Settings to…\" option usually found?",
          options: [
            "At the top of each configuration's own list, like Custom Results or Synonyms",
            "Inside the Security Settings screen",
            "Only in the installation script",
            "Inside the Results Preview panel"
          ],
          correct: 0,
          explain: "Each configuration's list has its own \"Copy Settings to…\", usually at the top of the list — in Synonyms, for example, it sits next to the \"Add Synonym\" button."
        },
        {
          q: "A destination Search Engine has been picked in the \"Copy Settings to…\" dropdown and \"Apply\" has been clicked. What happens next?",
          options: [
            "The settings are copied straight away, with no further choice",
            "A pop-up asks to choose between Copy and Add to Existing Settings and Copy and Replace Existing Settings, and \"Yes, apply\" saves the changes",
            "The source Search Engine's settings are deleted",
            "A CSV file with the settings is downloaded"
          ],
          correct: 1,
          explain: "After \"Apply\", the Copy settings mode pop-up appears with the two options — Add or Replace — and the changes are only saved with \"Yes, apply\"."
        },
        {
          q: "Search Engine <strong>Main</strong> has the synonym sets <code>sofa, couch</code> and <code>lamp, light</code>. Search Engine <strong>Outlet</strong>, in the same Store and language, has <code>rug, carpet</code>. The synonyms are copied from Main to Outlet with <strong>Copy and Add to Existing Settings</strong>. Which synonym sets does Outlet have afterwards?",
          options: [
            "Only sofa, couch and lamp, light",
            "Only rug, carpet",
            "rug, carpet, sofa, couch and lamp, light",
            "None, since Outlet already had synonyms of its own"
          ],
          correct: 2,
          explain: "Add puts Main's sets on top of Outlet's, and the sets already created in Outlet remain untouched — so Outlet keeps rug, carpet and gets sofa, couch and lamp, light as well. Losing rug, carpet is what Replace would do."
        },
        {
          q: "Same Search Engines, but this time the synonyms are copied from Main to Outlet with <strong>Copy and Replace Existing Settings</strong>. Which synonym sets does Outlet have afterwards?",
          options: [
            "Only sofa, couch and lamp, light — rug, carpet is deleted",
            "rug, carpet, sofa, couch and lamp, light",
            "Only rug, carpet, since Outlet's own sets are protected",
            "None — Replace empties the destination without copying anything"
          ],
          correct: 0,
          explain: "Replace replaces all the sets in Outlet with Main's: the sets already created in Outlet, here rug, carpet, are deleted, and only sofa, couch and lamp, light are left. Keeping all three is what Add would do."
        },
        {
          q: "After a <strong>Copy and Replace Existing Settings</strong>, it turns out the destination's original sets were still needed. Can they be recovered?",
          options: [
            "Yes, at any time from the Reset button",
            "Only within 24 hours",
            "Only if the source Search Engine still exists",
            "No — once a Replace has been applied, it can't be undone"
          ],
          correct: 3,
          explain: "Once a Replace has been applied, it can't be undone, and the destination's original settings can't be recovered — there's no Reset button or time window. That's why Replace is worth using with real caution."
        },
        {
          q: "The synonym set <code>sofa, couch</code> is copied from an English Search Engine to a German one in the same Store, whose products are indexed with German terms. What can happen?",
          options: [
            "The set may not be considered, since the copied terms don't match the destination's products",
            "The set is translated into German automatically",
            "Copy Settings refuses to copy between Search Engines",
            "The German products get renamed with the English terms"
          ],
          correct: 0,
          explain: "If a copied value doesn't match the destination, it may not be considered: the German products aren't indexed with \"sofa\", so the set has nothing to work on. Copy Settings doesn't translate anything or rename products — which is why languages and product names are worth checking before copying."
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
        lead: "A <strong>Redirection</strong> takes users from the Search Layer to another page, specified by a URL, when they search for a specific term — instead of showing them a results page.",
        blocks: [
          {
            html: `
              <h3>What It's For</h3>
              <p>Thanks to Redirections, users can find what they're looking for through the search bar, even when it isn't a product: it's a way to surface information that doesn't live in the catalogue itself. A redirection is useful, for example, to send users to:</p>
              <ul>
                <li>The website's privacy policy.</li>
                <li>The contact page.</li>
                <li>Other pages with more information — other pages of the company, a blog, related pages, and so on.</li>
                <li>A specific landing page based on a brand or a campaign, such as Black Friday, Sales or Christmas.</li>
              </ul>

              <h3>Creating a Redirection</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 420px; max-width: 55%;">
                  <img src="img/redirections-form.png" alt="Redirection form in the Admin Panel for a redirection named Contact: Status toggle on, Destination URL https://www.doofinder.com/en/contact, Search Terms with Broad Match selected, a Type a search term box and an Add term button, the term contact added, the Automatic redirection toggle on with the text Redirection will happen automatically as soon as the term is typed, and Cancel and Save buttons" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Clicking <strong>"Add Redirection"</strong> opens a form with the fields below. In this one, a redirection named <strong>Contact</strong> sends the search term <code>contact</code>, set to Broad Match, to Doofinder's contact page (its Destination URL), with <strong>Status</strong> and <strong>Automatic redirection</strong> both switched on. Each term added shows up below the <strong>Search Terms</strong> box, with the icon of its match type beside it. Once complete, the redirection is saved with <strong>"Save"</strong>.</p>
              <table class="theory-table">
                <thead><tr><th>Field</th><th>What it's for</th></tr></thead>
                <tbody>
                  <tr><td><strong>Redirection name</strong></td><td>A custom name to identify each redirection — the title at the top of the form (here, Contact).</td></tr>
                  <tr><td><strong>Status</strong></td><td>Switched on, it activates the redirection; switched off, it disables it.</td></tr>
                  <tr><td><strong>Destination URL</strong></td><td>The target URL: the page the redirection points to.</td></tr>
                  <tr><td><strong>Search Terms</strong></td><td>One or more terms that trigger the redirection, each added with "Add term" and set to either <strong>Exact Match</strong> — triggered only if the user types the exact search term — or <strong>Broad Match</strong> — triggered if the text typed by the user contains the search term.</td></tr>
                  <tr><td><strong>Automatic redirection</strong></td><td>Switched on, the redirection happens automatically, as soon as the matching term is typed. Switched off, it only happens once the user presses enter or searches in the site.</td></tr>
                </tbody>
              </table>

              <h3>An Example</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 400px; max-width: 55%;">
                  <img src="img/redirections-example-contact.png" alt="Search Layer of the Doofinder demo store with contact typed in the search box, and an arrow pointing to https://www.doofinder.com/en/contact: the Doofinder Contact page, titled We're Here to Help You, with a Support section and a form with Name and Email fields" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>With the <strong>Contact</strong> redirection above saved, a user who types <strong>contact</strong> in the Search Layer is taken straight to the Destination URL — Doofinder's contact page, titled "We're Here to Help You" — instead of being shown a results page. Since Automatic redirection is switched on, this happens as soon as the term is typed.</p>
              <p>Which searches trigger it depends on the match type of the term <code>contact</code>:</p>
              <table class="theory-table">
                <thead><tr><th>Search typed</th><th>Term set to Exact Match</th><th>Term set to Broad Match</th></tr></thead>
                <tbody>
                  <tr><td>"contact"</td><td>Redirects — it's the exact term</td><td>Redirects — the text contains "contact"</td></tr>
                  <tr><td>"contact page"</td><td>Doesn't redirect — it isn't the exact term</td><td>Redirects — the text contains "contact"</td></tr>
                  <tr><td>"customer service"</td><td>Doesn't redirect</td><td>Doesn't redirect — the text doesn't contain "contact"</td></tr>
                </tbody>
              </table>
              <p>And when the redirection happens depends on Automatic redirection:</p>
              <table class="theory-table">
                <thead><tr><th>Automatic redirection</th><th>A user types "contact" in the Search Layer</th></tr></thead>
                <tbody>
                  <tr><td><strong>Switched on</strong></td><td>The redirection happens automatically, as soon as the term is typed.</td></tr>
                  <tr><td><strong>Switched off</strong></td><td>The redirection only happens once the user presses enter or searches in the site.</td></tr>
                </tbody>
              </table>
              <p class="theory-callout">The match type decides <strong>which</strong> searches trigger a redirection; Automatic redirection decides <strong>when</strong> it happens.</p>

              <h3>Managing Redirections</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 460px; max-width: 55%;">
                  <img src="img/redirections-list.png" alt="Redirections list in the Admin Panel with an Add Redirection button, a Search box, a date range filter, a Status: All filter, and one row: the Contact redirection with the term contact, 0 executions, its Status toggle on and a three-dot menu" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Once saved, redirections show up in a list, where each one can be activated or deactivated with its Status toggle, and edited or deleted from its three-dot menu. To make finding a specific one easier as the list grows, the list can be searched, and filtered by date or by status.</p>
              <p>The redirections on the list can also be copied over to another Search Engine: clicking the <strong>"Copy settings to..."</strong> dropdown beside the <strong>"Add Redirection"</strong> button, selecting the Search Engine and clicking <strong>"Apply"</strong>.</p>
              <p class="theory-callout">Each Search Engine has a limit of <strong>100 redirections</strong>.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What does a Redirection do?",
          options: [
            "It removes a product from the results entirely",
            "It takes the user from the Search Layer to a specific URL when they search for a given term",
            "It renames a search term inside the data feed",
            "It makes two search terms return the same results"
          ],
          correct: 1,
          explain: "A redirection takes a user from the Search Layer to another page, specified by a URL, when they search for a given term — instead of showing a results page. Removing products is what Excluded Results does, and making two terms return the same results is what Synonyms does; a redirection doesn't touch the data feed either."
        },
        {
          q: "Which of these is a good use for a Redirection?",
          options: [
            "Converting a product's currency",
            "Hiding out of stock products from the results",
            "Mapping a feed field to a normalized field name",
            "Sending the search \"christmas\" to the Christmas campaign landing page"
          ],
          correct: 3,
          explain: "Redirections surface information that doesn't live in the catalogue itself — a privacy policy, a contact page, other pages with more information, or a landing page based on a brand or a campaign, such as Christmas. The other options have nothing to do with sending a search to a URL."
        },
        {
          q: "A redirection sends the search term <code>size guide</code>, set to <strong>Exact Match</strong>, to the store's size guide page. Which of these searches trigger it?",
          options: [
            "\"size guide\" and \"size guide boots\"",
            "Every search that contains \"size\" or \"guide\"",
            "Only \"size guide\"",
            "None, until the term is set to Broad Match"
          ],
          correct: 2,
          explain: "Exact Match only triggers the redirection if the user types the exact search term — so only \"size guide\". \"size guide boots\" contains the term, which would only trigger a Broad Match term, and a search with just \"size\" or \"guide\" doesn't contain the whole term either way."
        },
        {
          q: "The same <code>size guide</code> term is switched to <strong>Broad Match</strong>. A user searches for <strong>\"kids size guide\"</strong>. What happens?",
          options: [
            "The redirection is triggered, since the typed text contains \"size guide\"",
            "Nothing, since \"kids size guide\" isn't the exact term",
            "The redirection is triggered only if the user types \"kids\" last",
            "The Search Layer shows the size guide page as a product result"
          ],
          correct: 0,
          explain: "Broad Match triggers the redirection if the text typed by the user contains the search term — \"kids size guide\" contains \"size guide\", so the user is sent to the size guide page. Not being the exact term only matters with Exact Match, and a redirection never shows a page as a product result: it takes the user to the URL."
        },
        {
          q: "A redirection sends the term <code>shipping</code> (Broad Match) to the shipping information page, with <strong>Automatic redirection</strong> switched off. A user types \"shipping costs\" in the Search Layer. When is the user redirected?",
          options: [
            "Never, since Automatic redirection is switched off",
            "Once the user presses enter or searches in the site",
            "As soon as the letters \"ship\" are typed",
            "Only if \"shipping costs\" is added as a second term"
          ],
          correct: 1,
          explain: "With Automatic redirection switched off, the redirection only happens once the user presses enter or searches. It still fires — \"shipping costs\" contains the Broad Match term \"shipping\" — so no second term is needed. Redirecting as soon as the term is typed is what happens with Automatic redirection switched on, and \"ship\" alone doesn't contain the term."
        },
        {
          q: "How many redirections can a single Search Engine have?",
          options: ["10", "1,000", "Unlimited", "100"],
          correct: 3,
          explain: "Each Search Engine has a limit of 100 redirections."
        },
        {
          q: "In the redirections list, how is an existing redirection edited or deleted?",
          options: [
            "From its three-dot menu",
            "By creating a new redirection with the same name",
            "From the Field Name Mapping screen",
            "It can't be changed once saved"
          ],
          correct: 0,
          explain: "Each redirection in the list has a three-dot menu to edit or delete it, and a Status toggle to activate or deactivate it. The list can also be searched, and filtered by date or by status, to find a specific one."
        },
        {
          q: "A Store wants the redirections of its English Search Engine on its French Search Engine too. What's the way to do it?",
          options: [
            "It's not possible — each Search Engine's redirections can only be created by hand",
            "Exporting and re-importing the data feed",
            "The \"Copy settings to...\" dropdown beside \"Add Redirection\", selecting the French Search Engine and clicking \"Apply\"",
            "Switching on Automatic redirection on every redirection"
          ],
          correct: 2,
          explain: "The \"Copy settings to...\" dropdown beside the \"Add Redirection\" button copies the redirections to the Search Engine selected, once \"Apply\" is clicked — no need to recreate them by hand. The data feed has nothing to do with redirections, and Automatic redirection only decides when a redirection happens."
        },
        {
          q: "A redirection is saved with its <strong>Status</strong> switched off. What does that mean?",
          options: [
            "It redirects only once the user presses enter",
            "It isn't active: Status needs to be switched on to activate the redirection",
            "It only works with Exact Match terms",
            "It's deleted from the list"
          ],
          correct: 1,
          explain: "Status is what activates the redirection: switched off, the redirection is disabled, but it stays in the list and can be activated again with its Status toggle. Waiting until the user presses enter is what Automatic redirection switched off does — a different setting."
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
        lead: "<strong>Banners</strong> make it possible to promote certain products or marketing campaigns right inside the Search Layer's results.",
        blocks: [
          {
            html: `
              <h3>Adding a Banner</h3>
              <p>A banner can be shown for specific search terms, during a chosen time period, or set as the default banner shown for every search term that isn't otherwise covered. A new banner is created with the <strong>"Add Banner"</strong> button, and setting one up means filling in:</p>
              <table class="theory-table">
                <thead><tr><th>Setting</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><strong>Name</strong></td><td>Identifies the banner, to tell it apart from the others.</td></tr>
                  <tr><td><strong>Status</strong></td><td>Enables or disables the banner without deleting it.</td></tr>
                  <tr><td><strong>Default banner</strong></td><td>Makes it the default banner — the one shown for every search term that isn't otherwise covered, ignoring search terms altogether.</td></tr>
                  <tr><td><strong>Duration</strong></td><td>Optional: either ongoing, or a date range the banner is limited to ("Set date period").</td></tr>
                  <tr><td><strong>Search Terms</strong></td><td>The terms that trigger the banner (see below).</td></tr>
                </tbody>
              </table>
              <p class="theory-callout">Only one banner can be default at a time: marking a new one as default automatically un-defaults whichever one held that spot before.</p>

              <h3>Search Terms</h3>
              <figure class="lesson-figure lesson-figure-right gif-image" style="width: 360px; max-width: 55%;">
                  <img src="img/banners-search-terms.gif" data-base-src="img/banners-search-terms.gif" alt="Animation of the Search Terms field of a banner: the match type dropdown is set to Exact Match, and the terms doofinder, search and engine are typed and added one by one with Add term, each appearing below the field with its match type icon" data-action="zoom-image">
                  <canvas class="gif-freeze-canvas"></canvas>
                  <button type="button" class="gif-toggle-btn" data-action="toggle-gif" aria-label="Pause animation"><svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><rect x="3" y="2" width="3.4" height="12" rx="1"></rect><rect x="9.6" y="2" width="3.4" height="12" rx="1"></rect></svg></button>
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Several search terms can be typed and added to a banner. Whenever a user types one of them, the banner shows up at the top of the layer results.</p>
              <p>Each term is added with one of two match types, picked in the dropdown next to it:</p>
              <ul>
                <li><strong>Exact Match</strong> — the banner is shown only if the user types exactly that search term.</li>
                <li><strong>Broad Match</strong> — the banner is shown whenever the text typed by the user contains that search term.</li>
              </ul>
              <p>The default banner is the exception: it ignores search terms altogether, and is shown when no banner matches the search terms.</p>

              <h3>The Banner's Visuals</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 400px; max-width: 55%;">
                  <img src="img/banners-visual-config.png" alt="Upload Banner area with the Mode dropdown open, offering Visual Configuration and Code Configuration; a Desktop banner image already uploaded, with its image URL below it; an empty Mobile box with an Upload image button; the accepted formats and recommended sizes under each box; a Target Link field with a URL; and the Open the link in a new window toggle switched on" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>A banner can have an image for desktop screens and one for mobile screens. Its visuals are set in one of two modes:</p>
              <ul>
                <li><strong>Visual Configuration</strong> — the image is uploaded with the "Upload image" button, or its URL is typed in directly. The <strong>Target Link</strong> is the URL opened in the browser when the user clicks the banner, and <strong>"Open the link in a new window"</strong> opens it in a new window, so users can keep the current search page.</li>
                <li><strong>Code Configuration</strong> — for full control, the banner is created or customized with hand-written HTML code, which overrides the manual fields entirely.</li>
              </ul>
              <p class="theory-callout">Code Configuration requires knowing HTML to use.</p>

              <h3>Image Size</h3>
              <p>There's no standard size for banners, since the Layer size is variable. An image needs to meet these requirements:</p>
              <table class="theory-table">
                <thead><tr><th>Requirement</th><th>Value</th></tr></thead>
                <tbody>
                  <tr><td>Format</td><td>.jpg, .jpeg, .gif or .png</td></tr>
                  <tr><td>Maximum size</td><td>150 KB, when the image is uploaded to Doofinder's servers</td></tr>
                  <tr><td>Recommended size (desktop)</td><td>500–800 pixels wide and 150 pixels high</td></tr>
                  <tr><td>Recommended size (mobile)</td><td>640 pixels wide and 100 pixels high</td></tr>
                </tbody>
              </table>
              <p>The sizes are only what <strong>Doofinder</strong> recommends, not mandatory — a banner can be sized however best fits the Layer it's shown in. As with most configuration screens, the changes need to be saved with <strong>"Save"</strong> before leaving the page.</p>

              <h3>An Example</h3>
              <figure class="lesson-figure lesson-figure-right" style="width: 360px; max-width: 55%;">
                  <img src="img/banners-layer-match.png" alt="Search Layer with the search ray-ban sunglasses: 2 results found, an orange Summer Sale Sunglasses banner with a Shop the collection button at the top of the results, and below it the Ray-Ban Unisex Sunglasses at 124,00 € and the Ray-Ban Andy Sunglasses at 119,00 €, with a Brands filter listing Ray-Ban (2)" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>Take a Store that sells sunglasses and hoodies and runs a summer sale on sunglasses. A banner is added with the search term <code>sunglasses</code> set to <strong>Broad Match</strong>, and its Target Link points to the sale page. It isn't the default banner.</p>
              <p>When a user searches for "ray-ban sunglasses", the text typed contains the term "sunglasses", so the banner shows up at the top of the layer results. The Search Layer shows 2 results found, with the banner above the Ray-Ban Unisex Sunglasses and the Ray-Ban Andy Sunglasses, and the Brands filter counts two Ray-Ban products.</p>
              <div style="clear: both;"></div>
              <figure class="lesson-figure lesson-figure-left" style="width: 400px; max-width: 55%;">
                  <img src="img/banners-layer-nomatch.png" alt="Search Layer with the search hoodie: 3 results found and no banner — the Nike Sportswear Phoenix Hoodie at 68,00 €, the Adidas Originals Trefoil Hoodie at 58,00 € (down from 63,00 €) and the Adidas Sportswear Hoodie at 49,00 € — with a Brands filter listing Adidas (2) and Nike (1)" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>A search for "hoodie" doesn't contain the term, so the Search Layer shows the three hoodies found and no banner. If the Store had a default banner, this search would show that one instead, since no banner matches the search terms.</p>
              <p>With the term set to <strong>Exact Match</strong> instead, only the exact search "sunglasses" would show the banner:</p>
              <table class="theory-table">
                <thead><tr><th>Search</th><th>Term set to Broad Match</th><th>Term set to Exact Match</th></tr></thead>
                <tbody>
                  <tr><td>"sunglasses"</td><td>Banner shown</td><td>Banner shown</td></tr>
                  <tr><td>"ray-ban sunglasses"</td><td>Banner shown — the text typed contains the term</td><td>No banner — it isn't exactly the term</td></tr>
                  <tr><td>"hoodie"</td><td>No banner</td><td>No banner</td></tr>
                </tbody>
              </table>

              <h3>The Banners List</h3>
              <p>Once banners are created, they're listed in a table that also shows how each one performs:</p>
              <table class="theory-table">
                <thead><tr><th>Column</th><th>What it shows</th></tr></thead>
                <tbody>
                  <tr><td><strong>Name</strong></td><td>The banner's name</td></tr>
                  <tr><td><strong>Terms</strong></td><td>The search terms that trigger it</td></tr>
                  <tr><td><strong>Impressions</strong></td><td>Each display, counted once per minute, regardless of how many times it actually appeared within that minute</td></tr>
                  <tr><td><strong>Clicks</strong></td><td>How many times the banner has been clicked</td></tr>
                  <tr><td><strong>CTR</strong></td><td>Click-through rate: the clicks divided by the number of times the banner is shown</td></tr>
                  <tr><td><strong>Date Period</strong></td><td>The active date range, or "Ongoing"</td></tr>
                  <tr><td><strong>Status</strong></td><td>Enabled (shown if someone types one of its search terms) or disabled (not shown), switched by clicking it</td></tr>
                  <tr><td><strong>⭐</strong></td><td>Next to the name, marks whichever banner is currently the default</td></tr>
                </tbody>
              </table>

              <h3>Editing and Deleting</h3>
              <figure class="lesson-figure lesson-figure-left" style="width: 440px; max-width: 55%;">
                  <img src="img/banners-list.png" alt="Banners list with an Add Banner button, a search box, a date range and a Status: All filter, and a table with the columns Name, Terms, Impressions, Clicks, CTR, Date Period and Status: one banner, Doofinder, marked with a star, with 0 impressions, 0 clicks, CTR 0.0, Ongoing, its Status toggle switched on, a checkbox before its name and a three-dot menu at the end of the row" data-action="zoom-image">
                  <p class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></p>
                </figure>
              <p>An existing banner can be edited by clicking its name in the list, or through the three-dot menu, which also offers duplicating or deleting it.</p>
              <p>Banners can also be deleted by ticking the checkbox next to their name and confirming with the red delete button that appears.</p>`
          }
        ]
      },
      quiz: [
        {
          q: "What are Banners used for?",
          options: [
            "Blocking bot traffic by IP",
            "Promoting certain products or marketing campaigns inside the search results",
            "Mapping feed fields to normalized field names",
            "Generating search suggestions automatically"
          ],
          correct: 1,
          explain: "Banners promote certain products or marketing campaigns right inside the Search Layer's results. Blocking traffic, mapping fields and search suggestions have nothing to do with them."
        },
        {
          q: "A Store already has a default banner, and a new banner is marked as <strong>Default banner</strong>. What happens?",
          options: [
            "Both banners become default and take turns",
            "The new banner can't be saved until the old one is deleted",
            "Nothing changes for the old banner, and the new one is ignored",
            "The previous default banner is automatically un-defaulted"
          ],
          correct: 3,
          explain: "Only one banner can be default at a time: marking a new one as default automatically un-defaults whichever one held that spot before. There's no need to delete or change the old one by hand, and two banners can never be default together."
        },
        {
          q: "A Store adds a banner with the search term <code>raincoat</code> set to <strong>Broad Match</strong>. A user searches for \"yellow raincoat\". What happens?",
          options: [
            "No banner, since the search isn't exactly \"raincoat\"",
            "The banner is shown only if it's also the default banner",
            "The banner shows up at the top of the layer results, since the text typed contains \"raincoat\"",
            "The user is taken straight to the banner's Target Link"
          ],
          correct: 2,
          explain: "With Broad Match, the banner is shown whenever the text typed contains the term — \"yellow raincoat\" contains \"raincoat\". Requiring the exact term is what Exact Match does. A banner is shown at the top of the results; it only opens its Target Link when the user clicks it."
        },
        {
          q: "The same <code>raincoat</code> banner is switched to <strong>Exact Match</strong>. Which of these searches shows it?",
          options: [
            "Only \"raincoat\"",
            "\"raincoat\" and \"yellow raincoat\"",
            "Only \"yellow raincoat\"",
            "Any search, since it's the only banner"
          ],
          correct: 0,
          explain: "With Exact Match, the banner is shown only if the user types exactly that search term, so \"yellow raincoat\" no longer triggers it. Being the only banner doesn't make it show everywhere — that's what the Default banner setting does."
        },
        {
          q: "A Store has a banner for the search term <code>raincoat</code> (Broad Match) and another banner set as the default banner. A user searches for \"wellington boots\". Which banner is shown?",
          options: [
            "The raincoat banner, since it was created with search terms",
            "The default banner, since no banner matches the search terms",
            "Both banners, one above the other",
            "No banner, since \"wellington boots\" isn't a search term of any banner"
          ],
          correct: 1,
          explain: "\"wellington boots\" doesn't contain \"raincoat\", so the raincoat banner doesn't match. The default banner is shown for every search term that isn't otherwise covered, so that's the one shown here."
        },
        {
          q: "What overrides a banner's manual image and link fields?",
          options: ["The Duration setting", "The Default banner toggle", "Hand-written HTML code in Code Configuration", "The three-dot menu"],
          correct: 2,
          explain: "In Code Configuration, the banner is built with HTML code, which overrides the manual fields entirely — and it requires knowing HTML to use. Duration and Default banner only decide when the banner is shown, and the three-dot menu is for editing, duplicating or deleting it."
        },
        {
          q: "What's the maximum file size for a banner image uploaded to Doofinder's servers?",
          options: ["50 KB", "500 KB", "1 MB", "150 KB"],
          correct: 3,
          explain: "An uploaded banner image can be at most 150 KB, in .jpg, .jpeg, .gif or .png format."
        },
        {
          q: "Is the recommended banner size (500–800 pixels wide and 150 pixels high on desktop) mandatory?",
          options: [
            "No, it's only a recommendation — a banner can be sized to best fit its Layer",
            "Yes, uploads outside that size are rejected",
            "Only for the default banner",
            "Only on mobile"
          ],
          correct: 0,
          explain: "There's no standard size for banners, since the Layer size is variable: the recommended sizes aren't mandatory, and a banner can be sized however best fits the Layer it's shown in. The only hard limits on an uploaded image are its format and the 150 KB maximum."
        },
        {
          q: "A banner appears 5 times within the same minute. How many Impressions does the Banners list count for that minute?",
          options: [
            "5, one per appearance",
            "1, since each display is counted once per minute",
            "0, since only clicks are counted",
            "It depends on the CTR"
          ],
          correct: 1,
          explain: "Impressions count each banner display once per minute, regardless of how many times it actually appeared within that minute. Clicks are a separate column, and CTR is calculated from clicks and displays — it doesn't decide how impressions are counted."
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
                <li>Figure out why the same shoe shows up once per size, and fix it.</li>
                <li>Make sure the discontinued Kids line stops showing up in search.</li>
                <li>Make searching "trainers" find the products it should.</li>
                <li>Make "return policy" and "contact us" searches lead somewhere useful.</li>
                <li>Point people to the Black Friday campaign page from the search.</li>
                <li>Get the Spanish Search Engine to match the English one.</li>
              </ul>
              <p>Work through each step the same way you would in the real Doofinder Admin Panel — that will help you choose the right answers, and you'll actually need to do them for real to finalize all the steps of the exercise.</p>`
          }
        ]
      },
      exercise: {
        lead: `You reread Amanda's message on Slack and start working through her list, one task at a time.</p>
          <ul>
            <li>Figure out why the same shoe shows up once per size in the Search Layer.</li>
            <li>Make sure discontinued Doostride Kids products stop showing up in search.</li>
            <li>Make searching "trainers" find the products it should.</li>
            <li>Make "return policy" and "contact us" searches lead somewhere useful.</li>
            <li>Point people to the Black Friday campaign page from the search.</li>
            <li>Get the Spanish Search Engine to match the English one.</li>
          </ul>`,
        doneNote: "Doostride's search is clean and grouped again — Kids products are gone, sneakers and trainers behave the same, the right pages come up instantly, Black Friday is ready to go, and the Spanish storefront now matches too.",
        replyButtonLabel: "Reply to Amanda",
        phases: [
          {
            key: "grouping-diagnosis",
            title: "1. Grouping Product Variants — Part 1",
            question: "Quick reminder of what needs fixing: the same shoe keeps appearing several times in a row in the Search Layer, once for each size. To check it, you search for <strong>CONVERSE | TODDLER CHUCK TAYLOR ALL STAR AXEL MID</strong>:",
            scenarioImage: { src: "img/final-grouping-search-converse.png", alt: "Search Layer with the search CONVERSE | TODDLER CHUCK TAYLOR ALL STAR AXEL MID: 6 results found — the product itself and its sizes 5, 6, 7, 8 and 9 in black, all at 70,00 € — with Categories (Shoes 6), Brands (CONVERSE 6) and Price (70 to 70 €) filters on the left" },
            stackedMedia: true,
            wideMedia: true,
            scenario: "Six results show up for the same shoe: the product itself and each of its sizes, from 5 to 9 — all with the same image and the same price.</p><p class=\"exercise-scenario-text\">What's the most likely reason?",
            fields: [
              { key: "reason", label: "", type: "choice", layout: "column", options: [
                "Grouping isn't set up: the variants don't share the same group_id in the data feed, and \"Group variants as a single item\" needs to be enabled",
                "The Search Engine needs to be deleted and recreated from scratch",
                "Grouping only works when indexing via API, never via File or URL",
                "The CSS Selector needs to include a comma-separated mobile selector"
              ], correct: "Grouping isn't set up: the variants don't share the same group_id in the data feed, and \"Group variants as a single item\" needs to be enabled" }
            ],
            explain: "For the variants of a product to show up as a single result, they need to be grouped: every variant needs the same group_id in the data feed, and \"Group variants as a single item\" needs to be enabled on the Search Engine. Recreating the Search Engine, the indexing method and the CSS Selector have nothing to do with grouping, so none of them would fix this."
          },
          {
            key: "grouping-feed",
            title: "1. Grouping Product Variants — Part 2",
            question: "You go check the data feed and find two other versions of the whole catalogue floating around from an earlier attempt at grouping.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze the 3 full data feeds below and figure out which one actually gets every product's variants — the CONVERSE | TODDLER CHUCK TAYLOR ALL STAR AXEL MID's included — to group correctly.",
            beforeFields: `
              <div class="feed-preview-grid">
                <div class="feed-preview-card" style="flex-basis: 0; min-width: 200px;">
                  <p class="feed-preview-label">Data feed 1</p>
                  <img src="img/final-group-feed1-preview.png" alt="Preview of the full catalogue feed, showing the 6 rows of CONVERSE | TODDLER CHUCK TAYLOR ALL STAR AXEL MID (the product and its sizes 5 to 9) with the columns id, title, color, size and price — no group_id or group_leader column at all" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-group-feed-1.csv" download class="btn btn-ghost feed-download-btn">Download data feed 1</a>
                </div>
                <div class="feed-preview-card" style="flex-basis: 0; min-width: 200px;">
                  <p class="feed-preview-label">Data feed 2</p>
                  <img src="img/final-group-feed2-preview.png" alt="Preview of the full catalogue feed with a group_id column added, but spelled differently on each row of the same product — for the 6 rows of CONVERSE | TODDLER CHUCK TAYLOR ALL STAR AXEL MID: 6170310705322, 61703107053220, 617031070532 — and an empty group_leader column" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-group-feed-2.csv" download class="btn btn-ghost feed-download-btn">Download data feed 2</a>
                </div>
                <div class="feed-preview-card" style="flex-basis: 0; min-width: 200px;">
                  <p class="feed-preview-label">Data feed 3</p>
                  <img src="img/final-group-feed3-preview.png" alt="Preview of the full catalogue feed with a group_id column set to the group leader's own id on every row of that group — for CONVERSE | TODDLER CHUCK TAYLOR ALL STAR AXEL MID: 6170310705322 on all 6 rows — and group_leader set to true on exactly the leader row, false on the rest" data-action="zoom-image" class="feed-preview-img">
                  <a href="feeds/doostride-group-feed-3.csv" download class="btn btn-ghost feed-download-btn">Download data feed 3</a>
                </div>
              </div>
              <p class="theory-lead" style="margin-bottom:16px;">Choose the correct one:</p>`,
            fields: [
              { key: "validfeed", label: "", type: "choice", layout: "column", options: ["Data feed 1", "Data feed 2", "Data feed 3"], correct: "Data feed 3" }
            ],
            explain: "Data feed 3 is the only one that works: every variant of a product shares the exact same group_id — its group leader's own id (for the CONVERSE | TODDLER CHUCK TAYLOR ALL STAR AXEL MID, the leader is id 6170310705322, so all 6 rows carry group_id 6170310705322) — and exactly one row per group has group_leader set to true, so Doofinder knows which one to show first. Data feed 1 doesn't have a group_id column at all, so Doofinder has no way to know which rows belong together. Data feed 2 does have a group_id column, but each row's value is spelled slightly differently (6170310705322, 61703107053220, 617031070532 for the Converse Axel Mid alone) — since the values don't match exactly, Doofinder treats them as different groups, so nothing actually groups together."
          },
          {
            key: "problem-features",
            title: "2. Picking the right feature for each problem",
            question: "With the variants grouped, you go back over the rest of Amanda's list and work out which <strong>Doofinder</strong> feature, among the ones you've learned in this section — <strong>Excluded Results</strong>, <strong>Synonyms</strong>, <strong>Redirections</strong>, <strong>Banners</strong> and <strong>Copy Settings</strong> — is the right tool for each problem.</p><ul style=\"margin:0 0 16px; padding-left:20px;\"><li style=\"margin-bottom:14px;\"><strong>Problem 1:</strong> A couple of products from the <strong>Kids</strong> line, discontinued last month, still show up in search. You need a feature that stops them — and any other Kids product — from appearing, without touching the data feed.</li><li style=\"margin-bottom:14px;\"><strong>Problem 2:</strong> Searching <strong>\"trainers\"</strong> returns no results at all, since Doostride's catalogue always calls those products \"sneakers\". You need a feature that makes \"trainers\" find the same products.</li><li style=\"margin-bottom:14px;\"><strong>Problem 3:</strong> Searching <strong>\"return policy\"</strong> or <strong>\"contact us\"</strong> shows a results page full of products nobody was looking for. You need a feature that takes those searches straight to the right page instead.</li><li style=\"margin-bottom:14px;\"><strong>Problem 4:</strong> <strong>Black Friday</strong> is coming up, and nothing in the Search Layer points people to the campaign page. You need a feature that shows something promoting it, linking to that page.</li><li><strong>Problem 5:</strong> Once everything is sorted on the English Search Engine, the <strong>Spanish</strong> one needs the same setup, without rebuilding it all by hand.</li></ul><p class=\"theory-lead\" style=\"margin-bottom:16px;\">For each problem below, choose the most suitable feature to solve it:",
            fields: [
              { key: "problem1", label: "Problem 1", type: "select", options: ["Banners", "Copy Settings", "Excluded Results", "Redirections", "Synonyms"], correct: "Excluded Results" },
              { key: "problem2", label: "Problem 2", type: "select", options: ["Banners", "Copy Settings", "Excluded Results", "Redirections", "Synonyms"], correct: "Synonyms" },
              { key: "problem3", label: "Problem 3", type: "select", options: ["Banners", "Copy Settings", "Excluded Results", "Redirections", "Synonyms"], correct: "Redirections" },
              { key: "problem4", label: "Problem 4", type: "select", options: ["Banners", "Copy Settings", "Excluded Results", "Redirections", "Synonyms"], correct: "Banners" },
              { key: "problem5", label: "Problem 5", type: "select", options: ["Banners", "Copy Settings", "Excluded Results", "Redirections", "Synonyms"], correct: "Copy Settings" }
            ],
            explain: "<strong>Excluded Results</strong> fixes the first problem: it removes products from the Search Engine even though they're still in the data feed. <strong>Synonyms</strong> fixes the second: it associates an indexed term with another one, so the other term finds the same products. <strong>Redirections</strong> fixes the third: it takes users from the Search Layer straight to a URL when they search for a specific term. <strong>Banners</strong> fixes the fourth: it shows a promotional image in the Search Layer, linking to a page. <strong>Copy Settings</strong> fixes the fifth: it duplicates a Search Engine's configuration onto another one in the same Store. In the next steps, you'll work out how to configure each of these."
          },
          {
            key: "excluded-results-kids",
            title: "3. Excluded Results",
            question: "Doostride discontinued its entire <strong>Kids</strong> line last month, but a customer just complained about finding a Kids product in a search.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Choose the right way to make sure none of them show up again:",
            scenarioImage: { src: "img/final-kids-still-showing.png", alt: "Search Layer with the search chuck taylor: 3 results found — CONVERSE | TODDLER CHUCK TAYLOR ALL STAR AXEL MID at 70,00 € (a Kids product), CONVERSE | CHUCK TAYLOR ALL STAR LO at 100,00 € and CONVERSE | CHUCK TAYLOR ALL STAR II HI at 140,00 € — with Categories and Brands filters on the left" },
            stackedMedia: true,
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
            title: "4. Synonyms",
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
            title: "5. Redirections",
            question: "Amanda also wants a search to skip the results page entirely and go straight to the page users are actually looking for: <strong>\"return policy\"</strong> should land on Doostride's returns page.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Set up that redirection — choose the right configuration for each of the following:",
            fields: [
              { key: "matchtype", label: "Which match type should \"return policy\" use?", type: "select", options: ["Exact Match", "Broad Match"], correct: "Broad Match" },
              { key: "auto", label: "Should \"Automatic redirection\" be switched on?", type: "select", options: ["Yes, switch it on", "No, leave it off"], correct: "No, leave it off" },
              { key: "url", label: "Destination URL", type: "text", freeform: true }
            ],
            explain: "Broad Match is the safer choice for a full phrase like this — it also catches close variants such as \"what's your return policy\" or \"return policy for shoes\", where Exact Match would only trigger on that exact wording. Leaving \"Automatic redirection\" switched off means the redirection only happens once the user presses enter or actually searches, instead of as soon as the term is typed — while they might still be typing something else entirely."
          },
          {
            key: "banners-black-friday",
            title: "6. Banners",
            question: "Black Friday is coming up, and Amanda wants a banner for it, linking to Doostride's campaign landing page. It needs to show up on <strong>every search</strong>, and to stop on Black Friday itself, <strong>27 November</strong>. Doostride doesn't have any other banner.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Analyze the 4 banner configurations below and choose the one that actually does what Amanda wants:",
            fields: [
              { key: "correctbanner", type: "image-select", layout: "column", thumbCols: 2, stacked: true, options: [
                { value: "a", src: "img/final-banner-a.png", alt: "Add Banner form for BLACK FRIDAY: Status on, Default banner on, Duration set to Run this result continously starting today (ongoing), no search terms added, and Target Link https://doostride.com/black-friday", caption: "Option A" },
                { value: "b", src: "img/final-banner-b.png", alt: "Add Banner form for BLACK FRIDAY: Status on, Default banner on, Duration set to the date period 20/11/2026 – 27/11/2026, no search terms added, and Target Link https://doostride.com/black-friday", caption: "Option B" },
                { value: "c", src: "img/final-banner-c.png", alt: "Add Banner form for BLACK FRIDAY: Status on, Default banner off, Duration set to the date period 20/11/2026 – 27/11/2026, the search term black friday set to Broad Match, and Target Link https://doostride.com/black-friday", caption: "Option C" },
                { value: "d", src: "img/final-banner-d.png", alt: "Add Banner form for BLACK FRIDAY: Status on, Default banner on, Duration set to the date period 20/11/2026 – 30/11/2026, no search terms added, and Target Link https://doostride.com/black-friday", caption: "Option D" }
              ], correct: "b" }
            ],
            explain: "Option B is correct: as the Default banner, it shows whenever no banner matches the search terms — and since Doostride has no other banner, that means every search — and its date period ends on 27/11/2026, Black Friday itself. Option A is also the Default banner, but it's ongoing, so it would keep showing after Black Friday. Option C ends on the right day, but it isn't the Default banner: it only shows for searches containing \"black friday\", not on every search. Option D is the Default banner with a date period, but it runs until 30/11/2026, three days past Black Friday."
          },
          {
            key: "copy-settings-spanish",
            title: "7. Copy Settings",
            question: "With English sorted, Amanda wants the exact same Synonyms, Redirections and Banners mirrored on the <strong>Spanish</strong> Search Engine — but the Spanish Search Engine already has its own Spanish-language redirection for \"política de privacidad\" that needs to stay untouched.</p><p class=\"theory-lead\" style=\"margin-bottom:16px;\">Choose the right Copy Settings option:",
            fields: [
              { key: "copymode", label: "", type: "choice", layout: "column", options: [
                "Copy and Add to Existing Settings",
                "Copy and Replace Existing Settings"
              ], correct: "Copy and Add to Existing Settings" }
            ],
            explain: "Add to Existing Settings layers the English configuration on top of whatever the Spanish Search Engine already has, so the existing política de privacidad redirection survives untouched. Replace would wipe out the Spanish Search Engine's configuration entirely before applying the copy — including that existing redirection — and, as covered in the lesson, a Replace can't be undone afterward. Keep in mind the two Search Engines are in different languages: once copied, English terms like \"return policy\" or \"black friday\" need translating on the Spanish Search Engine, or they may not be recognized there."
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
            "Black Friday banner is live too, and I copied the synonyms, the redirection and the banner over to the Spanish Search Engine — added them on top, so your política de privacidad redirection is still exactly where you left it. I'm translating the copied terms into Spanish next.",
            "Enjoy the rest of your vacation, see you soon!"
          ],
          times: ["11:02", "11:02", "11:03", "11:04", "11:04"]
        }
      }
    }
  ]
};
