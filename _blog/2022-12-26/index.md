---
title: "Human flatulence is surprisingly bad for the environment"
postType: "random"
description: "A human's farts and breathing can make up almost 13% of their annual CO2e emissions!"
date: Dec 26, 2022
stylesheets: ["/css/blogPost.css", "style.css"]
# redirect_to: "/blog/2022-12-26/2022-12-26.html"
---

<script src="2022-12-26_files/libs/clipboard/clipboard.min.js"></script>
<script src="2022-12-26_files/libs/quarto-html/quarto.js"></script>
<script src="2022-12-26_files/libs/quarto-html/popper.min.js"></script>
<script src="2022-12-26_files/libs/quarto-html/tippy.umd.min.js"></script>
<script src="2022-12-26_files/libs/quarto-html/anchor.min.js"></script>
<link href="2022-12-26_files/libs/quarto-html/tippy.css" rel="stylesheet">
<link href="2022-12-26_files/libs/quarto-html/quarto-syntax-highlighting.css" rel="stylesheet" id="quarto-text-highlighting-styles">
<script src="2022-12-26_files/libs/bootstrap/bootstrap.min.js"></script>
<link href="2022-12-26_files/libs/bootstrap/bootstrap-icons.css" rel="stylesheet">
<link href="2022-12-26_files/libs/bootstrap/bootstrap.min.css" rel="stylesheet" id="quarto-bootstrap" data-mode="light">

  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js" type="text/javascript"></script>

<!-- <iframe src="2022-12-26.html" style="height:800px;width:100%;border-style:solid;"></iframe> -->


<!-- <div id="quarto-content" class="page-columns page-rows-contents page-layout-article"> -->

<!-- <main class="content" id="quarto-document-content"> -->

<!-- <header id="title-block-header" class="quarto-title-block default">
<div class="quarto-title">
<h1 class="title">Flatulence is shockingly bad for the environment</h1>
</div>

<div>
  <div class="description">
    CO2-equivalent emissions from human biological processes.
  </div>
</div>


<div class="quarto-title-meta">

    
    <div>
    <div class="quarto-title-meta-heading">Published</div>
    <div class="quarto-title-meta-contents">
      <p class="date">December 26, 2022</p>
    </div>
  </div>
  
    
  </div>
   -->

<!-- </header> -->

<section id="background" class="level2">
<h2 class="anchored" data-anchor-id="background">Background</h2>
<p>During some holiday sibling banter, the question arose of what biological “emission” (flatulence, eructation, breathing) is worst for the environment. This is a non-trivial question because, although e.g.&nbsp;we emit far less volume of flatus than exhaled CO<span class="math inline">\(_2\)</span>, the methane is far more potent than CO<span class="math inline">\(_2\)</span> in terms of CO<span class="math inline">\(_2\)</span> equivalent emissions.</p>
</section>
<section id="calculations" class="level2">
<h2 class="anchored" data-anchor-id="calculations">Calculations</h2>
<ul>
<li><p>For CO<span class="math inline">\(_2\)</span> equivalent conversions, we use the EPA’s <a href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator">Greenhouse Gas Equivalencies Calculator</a> <span class="citation" data-cites="epa_co2e"><a href="#ref-epa_co2e" role="doc-biblioref">[1]</a></span>.</p></li>
<li><p>Flatulence (<a href="#tbl-farts">Table&nbsp;1</a>) is calculated using mean compositional percentages (by volume) <span class="citation" data-cites="fart_concentration"><a href="#ref-fart_concentration" role="doc-biblioref">[2]</a></span> and mean production rates <span class="citation" data-cites="fart_amount"><a href="#ref-fart_amount" role="doc-biblioref">[3]</a></span>. Then, conversions are applied to arrive at CO<span class="math inline">\(_2\)</span> equivalent emissions.</p></li>
<li><p>Breathing (<a href="#tbl-breath">Table&nbsp;2</a>) is calculated using mean production rates of CO<span class="math inline">\(_2\)</span> and CH<span class="math inline">\(_4\)</span> directly <span class="citation" data-cites="breath"><a href="#ref-breath" role="doc-biblioref">[4]</a></span> and conversions to arrive at CO<span class="math inline">\(_2\)</span> equivalent emissions.</p></li>
<li><p>Eructation data was unavailable :(</p></li>
</ul>
<p>Results summarized in <a href="#tbl-summary">Table&nbsp;3</a>.</p>
<section id="input-gas-constants" class="level5">
<div id="gas-constants" class="cell" data-execution_count="1">
<details>
<summary>Code: Gas Constants</summary>
<div class="sourceCode cell-code" id="cb1"><pre class="sourceCode python code-with-copy"><code class="sourceCode python"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> IPython.display <span class="im">import</span> Markdown</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> pandas <span class="im">as</span> pd</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a><span class="co"># Gas Constants</span></span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>CO2_equivalent <span class="op">=</span> {</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    <span class="st">'H2'</span>: <span class="dv">0</span>,</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    <span class="st">'CO2'</span>: <span class="dv">1</span>,</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    <span class="st">'CH4'</span>: <span class="dv">25</span>,</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>    <span class="st">'O2'</span>: <span class="dv">0</span>,</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    <span class="st">'N2'</span>: <span class="dv">0</span>,</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    } <span class="co"># https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator</span></span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>L_PER_MOLE <span class="op">=</span> <span class="fl">22.4</span>  <span class="co"># common knowledge</span></span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>DENSITY_G_PER_L <span class="op">=</span> {</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    <span class="st">'H2'</span>:  <span class="fl">2.016</span> <span class="op">/</span> L_PER_MOLE,</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>    <span class="st">'CO2'</span>: <span class="fl">44.01</span> <span class="op">/</span> L_PER_MOLE,</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    <span class="st">'CH4'</span>: <span class="fl">16.04</span> <span class="op">/</span> L_PER_MOLE,</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>    <span class="st">'O2'</span>:  <span class="fl">16.00</span> <span class="op">/</span> L_PER_MOLE,</span>
<span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabindex="-1"></a>    <span class="st">'N2'</span>:  <span class="fl">14.01</span> <span class="op">/</span> L_PER_MOLE,</span>
<span id="cb1-19"><a href="#cb1-19" aria-hidden="true" tabindex="-1"></a>    }  <span class="co"># periodic table</span></span></code><button title="Copy to Clipboard" class="code-copy-button"><i class="bi"></i></button></pre></div>
</details>
</div>
</section>
<section id="input-flatus-fart-data" class="level5">
<div class="cell" data-execution_count="2">
<details>
<summary>Code: Flatus (Fart) Data</summary>
<div class="sourceCode cell-code" id="cb2"><pre class="sourceCode python code-with-copy"><code class="sourceCode python"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>farts_pct <span class="op">=</span> {<span class="st">'H2'</span>: <span class="fl">14.8</span>,</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>        <span class="st">'CO2'</span>: <span class="fl">34.7</span>,</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>        <span class="st">'CH4'</span>: <span class="fl">25.0</span>, <span class="co"># see note in discussion</span></span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>        <span class="st">'O2'</span>: <span class="fl">3.3</span>,</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>        <span class="st">'N2'</span>: <span class="fl">22.2</span>,</span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>        } <span class="co"># doi.org/10.1152/ajpgi.1997.272.5.G1028</span></span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>gases <span class="op">=</span> <span class="bu">list</span>(farts_pct.keys())</span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>farts_volume_L_per_day <span class="op">=</span> <span class="dv">3</span> <span class="co"># See discussion</span></span>
<span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a>farts_mass_g_per_day <span class="op">=</span> {gas: DENSITY_G_PER_L[gas] <span class="op">*</span> farts_volume_L_per_day <span class="op">*</span> farts_pct[gas] <span class="cf">for</span> gas <span class="kw">in</span> gases}</span>
<span id="cb2-10"><a href="#cb2-10" aria-hidden="true" tabindex="-1"></a>farts_CO2e_g_per_day <span class="op">=</span> {gas: farts_mass_g_per_day[gas] <span class="op">*</span> CO2_equivalent[gas] <span class="cf">for</span> gas <span class="kw">in</span> gases}</span>
<span id="cb2-11"><a href="#cb2-11" aria-hidden="true" tabindex="-1"></a>farts <span class="op">=</span> pd.DataFrame(</span>
<span id="cb2-12"><a href="#cb2-12" aria-hidden="true" tabindex="-1"></a>    data<span class="op">=</span>[farts_pct, farts_mass_g_per_day, farts_CO2e_g_per_day], </span>
<span id="cb2-13"><a href="#cb2-13" aria-hidden="true" tabindex="-1"></a>    index<span class="op">=</span>[<span class="st">'</span><span class="sc">% o</span><span class="st">f total volume'</span>, <span class="st">'mass (g/day)'</span>, <span class="st">'CO2-equivalent (g/day)'</span>]</span>
<span id="cb2-14"><a href="#cb2-14" aria-hidden="true" tabindex="-1"></a>).T</span>
<span id="cb2-15"><a href="#cb2-15" aria-hidden="true" tabindex="-1"></a>farts.loc[<span class="st">"Total"</span>] <span class="op">=</span> farts.<span class="bu">sum</span>()</span>
<span id="cb2-16"><a href="#cb2-16" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb2-17"><a href="#cb2-17" aria-hidden="true" tabindex="-1"></a>Markdown(farts.to_markdown(floatfmt<span class="op">=</span><span class="st">".1f"</span>))</span></code><button title="Copy to Clipboard" class="code-copy-button"><i class="bi"></i></button></pre></div>
</details>
<div class="cell-output cell-output-display" data-execution_count="2">
<div id="tbl-farts" class="anchored">
<table class="table table-sm table-striped">
<caption>Table&nbsp;1: Fart Composition and CO2-equivalent Emissions</caption>
<colgroup>
<col style="width: 10%">
<col style="width: 30%">
<col style="width: 22%">
<col style="width: 37%">
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;"></th>
<th style="text-align: right;">% of total volume</th>
<th style="text-align: right;">mass (g/day)</th>
<th style="text-align: right;">CO2-equivalent (g/day)</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;">H2</td>
<td style="text-align: right;">14.8</td>
<td style="text-align: right;">4.0</td>
<td style="text-align: right;">0.0</td>
</tr>
<tr class="even">
<td style="text-align: left;">CO2</td>
<td style="text-align: right;">34.7</td>
<td style="text-align: right;">204.5</td>
<td style="text-align: right;">204.5</td>
</tr>
<tr class="odd">
<td style="text-align: left;">CH4</td>
<td style="text-align: right;">25.0</td>
<td style="text-align: right;">53.7</td>
<td style="text-align: right;">1342.6</td>
</tr>
<tr class="even">
<td style="text-align: left;">O2</td>
<td style="text-align: right;">3.3</td>
<td style="text-align: right;">7.1</td>
<td style="text-align: right;">0.0</td>
</tr>
<tr class="odd">
<td style="text-align: left;">N2</td>
<td style="text-align: right;">22.2</td>
<td style="text-align: right;">41.7</td>
<td style="text-align: right;">0.0</td>
</tr>
<tr class="even" style="border-top: 1.1px solid black;">
<td style="text-align: left;">Total</td>
<td style="text-align: right;">100.0</td>
<td style="text-align: right;">311.0</td>
<td style="text-align: right;">1547.2</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</section>
<section id="input-breathing-data" class="level5">
<div class="cell" data-execution_count="3">
<details>
<summary>Code: Breathing Data</summary>
<div class="sourceCode cell-code" id="cb3"><pre class="sourceCode python code-with-copy"><code class="sourceCode python"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="co"># Farts</span></span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a>breath_pct <span class="op">=</span> {<span class="st">'CO2'</span>: <span class="st">''</span>, <span class="st">'CH4'</span>: <span class="st">''</span>} <span class="co"># Not used, but keeping for consistency</span></span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a>breath_g_per_day <span class="op">=</span> {</span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a>    <span class="st">'CO2'</span>: <span class="dv">28</span> <span class="op">*</span> <span class="dv">24</span>,</span>
<span id="cb3-5"><a href="#cb3-5" aria-hidden="true" tabindex="-1"></a>    <span class="st">'CH4'</span>: <span class="fl">2.5e-3</span> <span class="op">*</span> <span class="dv">24</span>} <span class="co"># doi.org/10.1016/j.scitotenv.2022.155241</span></span>
<span id="cb3-6"><a href="#cb3-6" aria-hidden="true" tabindex="-1"></a>gases <span class="op">=</span> <span class="bu">list</span>(breath_g_per_day.keys())</span>
<span id="cb3-7"><a href="#cb3-7" aria-hidden="true" tabindex="-1"></a>breath_CO2e_g_per_day <span class="op">=</span> {gas: breath_g_per_day[gas] <span class="op">*</span> CO2_equivalent[gas] <span class="cf">for</span> gas <span class="kw">in</span> gases}</span>
<span id="cb3-8"><a href="#cb3-8" aria-hidden="true" tabindex="-1"></a>breath <span class="op">=</span> pd.DataFrame(</span>
<span id="cb3-9"><a href="#cb3-9" aria-hidden="true" tabindex="-1"></a>    data<span class="op">=</span>[breath_pct, breath_g_per_day, breath_CO2e_g_per_day], </span>
<span id="cb3-10"><a href="#cb3-10" aria-hidden="true" tabindex="-1"></a>    index<span class="op">=</span>[<span class="st">'</span><span class="sc">% o</span><span class="st">f total volume'</span>, <span class="st">'mass (g/day)'</span>, <span class="st">'CO2-equivalent (g/day)'</span>]</span>
<span id="cb3-11"><a href="#cb3-11" aria-hidden="true" tabindex="-1"></a>).T</span>
<span id="cb3-12"><a href="#cb3-12" aria-hidden="true" tabindex="-1"></a>breath.loc[<span class="st">"Total"</span>] <span class="op">=</span> breath.<span class="bu">sum</span>()</span>
<span id="cb3-13"><a href="#cb3-13" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb3-14"><a href="#cb3-14" aria-hidden="true" tabindex="-1"></a>Markdown(breath.to_markdown(floatfmt<span class="op">=</span><span class="st">'.1f'</span>))</span></code><button title="Copy to Clipboard" class="code-copy-button"><i class="bi"></i></button></pre></div>
</details>
<div class="cell-output cell-output-display" data-execution_count="3">
<div id="tbl-breath" class="anchored">
<table class="table table-sm table-striped">
<caption>Table&nbsp;2: Fart Composition and CO2-equivalent Emissions</caption>
<colgroup>
<col style="width: 10%">
<col style="width: 30%">
<col style="width: 22%">
<col style="width: 37%">
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;"></th>
<th style="text-align: left;">% of total volume</th>
<th style="text-align: right;">mass (g/day)</th>
<th style="text-align: right;">CO2-equivalent (g/day)</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;">CO2</td>
<td style="text-align: left;"></td>
<td style="text-align: right;">672.0</td>
<td style="text-align: right;">672.0</td>
</tr>
<tr class="even">
<td style="text-align: left;">CH4</td>
<td style="text-align: left;"></td>
<td style="text-align: right;">0.1</td>
<td style="text-align: right;">1.5</td>
</tr>
<tr class="odd" style="border-top: 1.1px solid black;">
<td style="text-align: left;">Total</td>
<td style="text-align: left;"></td>
<td style="text-align: right;">672.1</td>
<td style="text-align: right;">673.5</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</section>
<section id="input-eructation-burp-data" class="level5">
<!-- <p>Input Eructation (Burp) Data: Data unavailable :(</p> -->
</section>
</section>
<section id="results-summary" class="level2">
<h3 class="anchored" data-anchor-id="results-summary">Results Summary</h3>
<div class="cell" data-execution_count="4">
<details>
<summary>Code</summary>
<div class="sourceCode cell-code" id="cb4"><pre class="sourceCode python code-with-copy"><code class="sourceCode python"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a>df <span class="op">=</span> pd.concat((farts, breath), axis<span class="op">=</span><span class="dv">0</span>, keys<span class="op">=</span>[<span class="st">'Flatulence'</span>, <span class="st">'Breathing'</span>])</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a><span class="co"># df.plot.pie(y='CO2-equivalent (g/day)', figsize=(6, 6), autopct='%1.1f%%', title='CO2-equivalent Emissions')</span></span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>df2 <span class="op">=</span> df[df.index.get_level_values(<span class="dv">1</span>) <span class="op">==</span> <span class="st">'Total'</span>].iloc[:, [<span class="dv">2</span>]]</span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a>df2[<span class="st">'</span><span class="sc">% o</span><span class="st">f total'</span>] <span class="op">=</span> df2[<span class="st">'CO2-equivalent (g/day)'</span>] <span class="op">/</span> df2[<span class="st">'CO2-equivalent (g/day)'</span>].<span class="bu">sum</span>() <span class="op">*</span> <span class="dv">100</span></span>
<span id="cb4-5"><a href="#cb4-5" aria-hidden="true" tabindex="-1"></a>df2.loc[<span class="st">"Total"</span>] <span class="op">=</span> df2.<span class="bu">sum</span>()</span>
<span id="cb4-6"><a href="#cb4-6" aria-hidden="true" tabindex="-1"></a>Markdown(df2.to_markdown(floatfmt<span class="op">=</span><span class="st">'.1f'</span>))</span></code><button title="Copy to Clipboard" class="code-copy-button"><i class="bi"></i></button></pre></div>
</details>
<div class="cell-output cell-output-display" data-execution_count="4">
<div id="tbl-summary" class="anchored">
<table class="table table-sm table-striped">
<caption>Table&nbsp;3: Summary of CO2-equivalent Emissions</caption>
<thead>
<tr class="header">
<th style="text-align: left;"></th>
<th style="text-align: right;">CO2-equivalent (g/day)</th>
<th style="text-align: right;">% of total</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;">(‘Flatulence’, ‘Total’)</td>
<td style="text-align: right;">1547.2</td>
<td style="text-align: right;">69.7</td>
</tr>
<tr class="even">
<td style="text-align: left;">(‘Breathing’, ‘Total’)</td>
<td style="text-align: right;">673.5</td>
<td style="text-align: right;">30.3</td>
</tr>
<tr class="odd" style="border-top: 1.1px solid black;">
<td style="text-align: left;">Total</td>
<td style="text-align: right;">2220.7</td>
<td style="text-align: right;">100.0</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<p>To put this in perspective, the average American produces 17.38 metric tons of CO<span class="math inline">\(_2\)</span> equivalent per year <span class="citation" data-cites="co2_emissions"><a href="#ref-co2_emissions" role="doc-biblioref">[5, p. 2019]</a></span>, so farting and breathing combined is about 4.7% of that! Farting alone is about 3.2% of an American’s yearly CO<span class="math inline">\(_2\)</span> emissions! Worldwide carbon emissions per capita are lower at around 6.35 tons/year, making human farting and breathing about 12.8% of global CO<span class="math inline">\(_2\)</span> equivalent emissions! (See discussion for the caveat, though, that we assume a methane producing person, of which only about 1 in 3 people are, reducing it to about 3.9%). (Also, there’s the caveat that, since our food is grown/raised, our bodies are kind of “carbon neutral” in a sense, but this shouldn’t absolve us of our guilt because e.g.&nbsp;farmland fixes less carbon than fallowed land).</p>
</section>
<section id="discussion" class="level2">
<h2 class="anchored" data-anchor-id="discussion">Discussion</h2>
<p>As one may expect, humans are highly diverse so these numbers often have very large standard deviations.</p>
<p>Notably, CH<span class="math inline">\(_4\)</span> concentration in both flatulence and breath is highly bimodal, with most people producing virtually no methane but some small percentage (about a third <span class="citation" data-cites="ch4"><a href="#ref-ch4" role="doc-biblioref">[6]</a></span>) of people producing significantly more <span class="citation" data-cites="fart_concentration"><a href="#ref-ch4" role="doc-biblioref">[6]</a></span>. For sake of fun, I assume that the hypothetical person in question is in the latter category: a “methane producer” as it is referred to in the literature. For flatulence, I use a “reasonable” value of 25% methane (instead of the 5.6% mean) <span class="citation" data-cites="fart_concentration"><a href="#ref-fart_concentration" role="doc-biblioref">[2]</a></span>, then, to hack-ily make the percentages add up to 100 again, I reduced the H<span class="math inline">\(_2\)</span> percentage from 34.3 to 14.8%, since that was most negatively correlated with CH<span class="math inline">\(_4\)</span>. For breath, from <span class="citation" data-cites="breath"><a href="#ref-breath" role="doc-biblioref">[4, Fig. 1]</a></span>, I estimate 2.5 mg/hour.</p>
<p>For the total daily production of flatulence, this is also highly variable, but is reportedly between 16-64 mL/hour <span class="citation" data-cites="fart_amount"><a href="#ref-fart_amount" role="doc-biblioref">[3]</a></span>. Even this is probably an estimate based on citations from the meta-analysis <span class="citation" data-cites="ch4"><a href="#ref-ch4" role="doc-biblioref">[6]</a></span>, which states studies reporting 2.2, 3.5, and even 10 L/day (10 L/day = 416 mL / hour!). I’ll just call it 3 L/day.</p>
<p>Despite methane exhalation being highly variable (see above), CO<span class="math inline">\(_2\)</span> production from breathing appears have relatively little variation <span class="citation" data-cites="breath"><a href="#ref-breath" role="doc-biblioref">[4]</a></span>. From <span class="citation" data-cites="breath"><a href="#ref-breath" role="doc-biblioref">[4, Fig. 1]</a></span>, I estimate 28 g/hour. Other sources claim CO<span class="math inline">\(_2\)</span> production can also be very well estimated from biomass across a wide range of ectotherm species.</p>
</section>
<section id="conclusions" class="level2">
<h2 class="anchored" data-anchor-id="conclusions">Conclusions</h2>
<p>Even though a lot of these numbers are highly variable and not particularly reliable, I was surprised to find:</p>
<ol type="1">
<li>There’s a pretty big body of literature of the topic of human body emissions! There’s probably 2-dozen papers on the topic of flatulence alone.</li>
<li>Flatulence produces around 2.3x <em>more</em> CO<span class="math inline">\(_2\)</span>-equivalent emissions than breathing (70% vs 30%), assuming you are a methane producer (~0.3x otherwise).</li>
<li>The average American’s farts make up 3.2% of their yearly CO<span class="math inline">\(_2\)</span> emissions, and the average person’s farts make up 12.8% of their global CO<span class="math inline">\(_2\)</span> emissions (assuming they are a methane producer).</li>
</ol>

</section>

<div id="quarto-appendix" class="default"><section class="quarto-appendix-contents" role="doc-bibliography"><h2 class="anchored quarto-appendix-heading">References</h2><div id="refs" class="references csl-bib-body" role="doc-bibliography">
<div id="ref-epa_co2e" class="csl-entry" role="doc-biblioentry">
<div class="csl-left-margin">[1] </div><div class="csl-right-inline">US Environmental Protection Agency (EPA), <span>“<a href="\url{https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator}">Greenhouse gas equivalencies calculator</a>.”</span> 2022.</div>
</div>
<div id="ref-fart_concentration" class="csl-entry" role="doc-biblioentry">
<div class="csl-left-margin">[2] </div><div class="csl-right-inline">F. Suarez, J. Furne, J. Springfield, and M. Levitt, <span>“<a href="https://doi.org/10.1152/ajpgi.1997.272.5.G1028">Insights into human colonic physiology obtained from the study of flatus composition.</a>”</span> <em>Am J Physiol</em>, vol. 272, no. 5 Pt 1, pp. G1028–33, May 1997.</div>
</div>
<div id="ref-fart_amount" class="csl-entry" role="doc-biblioentry">
<div class="csl-left-margin">[3] </div><div class="csl-right-inline">K. R. Price, J. Lewis, G. M. Wyatt, and G. R. Fenwick, <span>“<a href="https://doi.org/10.1002/food.19880320626">Review article flatulence — causes, relation to diet and remedies</a>,”</span> <em>Food / Nahrung</em>, vol. 32, no. 6, pp. 609–626, 1988.</div>
</div>
<div id="ref-breath" class="csl-entry" role="doc-biblioentry">
<div class="csl-left-margin">[4] </div><div class="csl-right-inline">M. Li, G. Bekö, N. Zannoni, G. Pugliese, M. Carrito, N. Cera, C. Moura, P. Wargocki, P. Vasconcelos, P. Nobre, N. Wang, L. Ernle, and J. Williams, <span>“<a href="https://doi.org/10.1016/j.scitotenv.2022.155241">Human metabolic emissions of carbon dioxide and methane and their implications for carbon emissions</a>,”</span> <em>Science of The Total Environment</em>, vol. 833, p. 155241, 2022.</div>
</div>
<div id="ref-co2_emissions" class="csl-entry" role="doc-biblioentry">
<div class="csl-left-margin">[5] </div><div class="csl-right-inline">H. Ritchie and M. Roser, <span>“<a href="https://ourworldindata.org/greenhouse-gas-emissions">Greenhouse gas emissions</a>.”</span> 2019.</div>
</div>
<div id="ref-ch4" class="csl-entry" role="doc-biblioentry">
<div class="csl-left-margin">[6] </div><div class="csl-right-inline">D. Polag and F. Keppler, <span>“<a href="https://doi.org/10.1016/j.atmosenv.2019.116823">Global methane emissions from the human body: Past, present and future</a>,”</span> <em>Atmospheric Environment</em>, vol. 214, p. 116823, 2019.</div>
</div>
</div></section>
<!-- </div></main> -->
<!-- /main column -->
<script id="quarto-html-after-body" type="application/javascript">
window.document.addEventListener("DOMContentLoaded", function (event) {
  const toggleBodyColorMode = (bsSheetEl) => {
    const mode = bsSheetEl.getAttribute("data-mode");
    const bodyEl = window.document.querySelector("body");
    if (mode === "dark") {
      bodyEl.classList.add("quarto-dark");
      bodyEl.classList.remove("quarto-light");
    } else {
      bodyEl.classList.add("quarto-light");
      bodyEl.classList.remove("quarto-dark");
    }
  }
  const toggleBodyColorPrimary = () => {
    const bsSheetEl = window.document.querySelector("link#quarto-bootstrap");
    if (bsSheetEl) {
      toggleBodyColorMode(bsSheetEl);
    }
  }
  toggleBodyColorPrimary();  
  const icon = "";
  const anchorJS = new window.AnchorJS();
  anchorJS.options = {
    placement: 'right',
    icon: icon
  };
  anchorJS.add('.anchored');
  const clipboard = new window.ClipboardJS('.code-copy-button', {
    target: function(trigger) {
      return trigger.previousElementSibling;
    }
  });
  clipboard.on('success', function(e) {
    // button target
    const button = e.trigger;
    // don't keep focus
    button.blur();
    // flash "checked"
    button.classList.add('code-copy-button-checked');
    var currentTitle = button.getAttribute("title");
    button.setAttribute("title", "Copied!");
    let tooltip;
    if (window.bootstrap) {
      button.setAttribute("data-bs-toggle", "tooltip");
      button.setAttribute("data-bs-placement", "left");
      button.setAttribute("data-bs-title", "Copied!");
      tooltip = new bootstrap.Tooltip(button, 
        { trigger: "manual", 
          customClass: "code-copy-button-tooltip",
          offset: [0, -8]});
      tooltip.show();    
    }
    setTimeout(function() {
      if (tooltip) {
        tooltip.hide();
        button.removeAttribute("data-bs-title");
        button.removeAttribute("data-bs-toggle");
        button.removeAttribute("data-bs-placement");
      }
      button.setAttribute("title", currentTitle);
      button.classList.remove('code-copy-button-checked');
    }, 1000);
    // clear code selection
    e.clearSelection();
  });
  function tippyHover(el, contentFn) {
    const config = {
      allowHTML: true,
      content: contentFn,
      maxWidth: 500,
      delay: 100,
      arrow: false,
      appendTo: function(el) {
          return el.parentElement;
      },
      interactive: true,
      interactiveBorder: 10,
      theme: 'quarto',
      placement: 'bottom-start'
    };
    window.tippy(el, config); 
  }
  const noterefs = window.document.querySelectorAll('a[role="doc-noteref"]');
  for (var i=0; i<noterefs.length; i++) {
    const ref = noterefs[i];
    tippyHover(ref, function() {
      // use id or data attribute instead here
      let href = ref.getAttribute('data-footnote-href') || ref.getAttribute('href');
      try { href = new URL(href).hash; } catch {}
      const id = href.replace(/^#\/?/, "");
      const note = window.document.getElementById(id);
      return note.innerHTML;
    });
  }
  const findCites = (el) => {
    const parentEl = el.parentElement;
    if (parentEl) {
      const cites = parentEl.dataset.cites;
      if (cites) {
        return {
          el,
          cites: cites.split(' ')
        };
      } else {
        return findCites(el.parentElement)
      }
    } else {
      return undefined;
    }
  };
  var bibliorefs = window.document.querySelectorAll('a[role="doc-biblioref"]');
  for (var i=0; i<bibliorefs.length; i++) {
    const ref = bibliorefs[i];
    const citeInfo = findCites(ref);
    if (citeInfo) {
      tippyHover(citeInfo.el, function() {
        var popup = window.document.createElement('div');
        citeInfo.cites.forEach(function(cite) {
          var citeDiv = window.document.createElement('div');
          citeDiv.classList.add('hanging-indent');
          citeDiv.classList.add('csl-entry');
          var biblioDiv = window.document.getElementById('ref-' + cite);
          if (biblioDiv) {
            citeDiv.innerHTML = biblioDiv.innerHTML;
          }
          popup.appendChild(citeDiv);
        });
        return popup.innerHTML;
      });
    }
  }
});
</script>
<!-- </div> -->