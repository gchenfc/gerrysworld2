---
title: "Renting vs Buying (Pt. 2)"
postType: "random"
description: "Financial comparison between buying vs renting."
date: Dec 29, 2023
stylesheets: ["/css/blogPost.css"]
---

<!-- Mathjax Support -->
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Disclaimer:

I am not an expert, just sharing my thoughts based on my limited understanding and math intuition.  Please do share any corrections or thoughts you have!

---

# Introduction

Kind of related to my previous post on [renting vs buying](/blog/2023-06-07_house-buying.html), I wanted to do an analysis of the financial implications of buying vs renting.  Specifically, assuming certain numbers on appreciation, interest rate, market return, etc, and assuming we only care about financial (and not psychological) factors, does it make more sense to buy or rent?

# Assumptions and Parameters

## Assumptions
* We have 2 options: rent or buy
  * For each, we assume the value of the property we reside in is the same (e.g. Zestimate vs Rent Zestimate)
* Excellent credit score (>800)
* Any excess money (both upfront and per-month) is invested in the stock market (e.g. S&P 500)
  * e.g. if renting, the money we would have spent on downpayment is invested in the stock market.
* We have sufficient capital to buy the entire house outright if we wanted

Temporarily, we will ignore the risk differential between the stock market and the housing market, but this is a very important point that we must consider later.

{% collapsible --expanded %}
## Parameters to Vary
* General Parameters:
  * $$R_m$$: Stock Market Return percent (proportion), typically 7%
  * $$V$$: Property value, can assume 1 w.l.o.g.
* Buy Parameters:
  * $$D$$: Down payment percent (proportion), typically 20%
  * $$R_i$$: Mortgage Interest rate, typically 3-7%
  * $$A$$: Closing cost percent (proportion), typically 2-5%
  * $$R_a$$: Property Appreciation rate, typically 0-5%
  * Maintenance costs
    * $$P$$: Mortgage-dependent (i.e. PMI aka mortgage insurance for <20% down payment)
    * $$C$$: Fixed (tax, insurance, etc.), typically 1-2% of property value
* Rent Parameters:
  * Rent price
    * This is implicitly a function of the market.  Define $$R_l := \frac{annual~rent}{property~value}$$ as the percent (proportion) annual return a landlord expects on their property, excluding maintenance costs.  Then monthly rent would be $$\frac{R_l\cdot V}{12}$$.

This gives us 7 twiddle-able parameters: $$R_m, D, R_i, P, C, R_l$$.

To make things more tractable, let's make the following "nominal" assumptions, and twiddle only one parameter at a time:

* $$R_m = 7\%$$,
* $$D = 20\%$$,
* $$R_i = 5.5\%$$,
* $$P = 0\%$$ (no PMI for 20% down payment),
* $$C = (0.016)V$$.

In case you are curious, here's some details of how I came up with nominals for the more contentious parameters:
{% collapsible %}
### Historical Market Returns
In my head, I usually assume 7%, but upon checking the S&P 500 historical annualized cumulative returns, it's actually closer to 10%.  e.g. over the past 50, 40, 30, 20, and 10 years, it was
[10.44%](https://www.officialdata.org/us/stocks/s-p-500/1973?amount=100&endYear=2023),
[11.36%](https://www.officialdata.org/us/stocks/s-p-500/1983?amount=100&endYear=2023),
[9.98%](https://www.officialdata.org/us/stocks/s-p-500/1993?amount=100&endYear=2023),
[10.20%](https://www.officialdata.org/us/stocks/s-p-500/2003?amount=100&endYear=2023), and
[13.05%](https://www.officialdata.org/us/stocks/s-p-500/2013?amount=100&endYear=2023)
respectively.  But because I think people will doubt the validity of the analysis if I say 10%, I will use 7% as a nominal value.
{% endcollapsible %}

{% collapsible %}
### Mortgage Interest Rate
We can [observe](https://fred.stlouisfed.org/graph/?g=1dsjO) that mortgage interest rate is reasonably well correlated with Federal Funds Rate (although it should be better correlated with bond rates, FFR is close enough and easier to analyze).

Specifically, mortgage rate is roughly similar to the bank prime loan rate which is generally pegged 3% above the FFR which is what we hear on the news/media.  The FFR was around 0% for much of the past decade and tends to be jumpy (not-smooth), but something like 2.5% is a reasonable nominal value, making the prime rate 5.5% and the mortgage rate similarly ~5.5%.

We also see that the 15-year and 30-year rates differ by a little less than a percent.  We should analyze 15-year, 30-year, and variable rate mortgages separately, but for a nominal value we will just use the 30-year rate.

<img src="https://fred.stlouisfed.org/graph/fredgraph.png?g=1dsjO" />

{% endcollapsible %}

{% collapsible %}
### PMI (Private Mortgage Insurance)
Typically not charged for 20% down payment.  Based on the super vague [Google mortgage calculator](https://www.google.com/search?q=mortgage+calculator), it seems PMI for a $1M home is about:
* $825/mo for 0% down
* $618/mo for 5% down
* $413/mo for 10% down
* $177/mo for 15% down
* $0/mo for 20% down

So it seems they're doing about $41.25/mo (=495/yr) per 1% less than 20% down for a $1M house, so
$$ P = (0.0495\% / year) \frac{(20\%-D)}{1\%} $$.  Yes the units are right and it's confusing, but basically $$P$$ is equivalent to about 5% additional interest rate when $$D < 20\%$$ and $$P = 0$$ otherwise.
{% endcollapsible %}

{% collapsible %}
### Maintenance Costs
Also based on the super vague [Google mortgage calculator](https://www.google.com/search?q=mortgage+calculator), tax is estimated at 1.25% and home insurance at 0.35% yearly, together making 1.6% yearly.
{% endcollapsible %}

{% collapsible %}
### Rent Price
A landlord should aim for approximately market ($$R_l$$) returns adjusted for risk and liquidity.  I've heard from random people that they do typically aim for around 7% annual rent payment 
{% endcollapsible %}

{% endcollapsible %}

{% collapsible --expanded %}
## Cost Equations

### Owning
<!-- Align math environment -->
<!-- $$\begin{tabular}{r l}
1 + 2 &= 3 \\
4 + 5 &= 6
\end{tabular}$$ -->

<style>

/* Format the table so that every other tbody is grey */
thead {
  background-color: #f0f0f0;
}
tbody:last-child td {
  background-color: #f8f8f8;
}
thead th {
  border-bottom: 2px solid #808080;
}
tbody tr:last-child td {
  border-bottom: 2px solid #808080;
}

</style>

| Cost | Description | Expression |
|:--------:|:-------:|:--------|
| Upfront Costs | (Downpayment) + (closing costs) | $$I ~:= (D + A)V$$ |
| Ongoing Costs | (Mortgage) + (maintenance) | $$M := m(R_i)(1-D)V + PV + CV$$ |
|--|--|--|
| Total equity at time T | (House Value) - (closing costs) - (mortgage principle) | $$E(T) ~:= V(1 + R_a)^T(1 - A) - p(T, R_i)(1-D)V$$ |
| Total spent at time T | (Upfront Costs) + (Ongoing Costs) $$\cdot$$ T | $$I + 12MT$$ |
|--|--|--|
| Net at time T | (Total Equity) - (Total Spent) | $$ E(T) - I - 12MT $$ |

Where $$m(R_i)$$ is the monthly mortgage payment for a 30-year mortgage at interest rate $$R_i$$ (as a proportion of the total borrowed amount $$(1-D)V$$ ), and $$p(T, R_i)$$ is the total principal owed on a mortgage after $$T$$ years at interest rate $$R_i$$ (also as a percentage of the total borrowed amount $$(1-D)V$$).

$$m(R_i)$$ is a standard equation.  Denoting $$r_i:=R_i/12$$, then

$$m(12r_i) = \frac{r_i(1+r_i)^{360}}{(1+r_i)^{360} - 1}.$$

$$p(T, R_i)$$ is also a reasonably standard calculation:

$$\begin{align*}
  p(T, 12r_i) &= (1+r_i)^{12T} - \frac{(1+r_i)^{12T} - 1}{r_i}m(R_i) \\
            &= (1+r_i)^{12T} - \frac{(1+r_i)^{12T} - 1}{(1+r_i)^{360} - 1}(1+r_i)^{360}
\end{align*}$$


### Renting

| Cost | Description | Expression |
|:--------:|:-------:|:--------|
| Upfront Costs | 0 | $$I ~:= 0$$ |
| Ongoing Costs | Rent | $$M := R_lV/12$$ |
|--|--|--|
| Total spent at time T | (Upfront Costs) + (Ongoing Costs) $$\cdot$$ T | $$I + 12MT$$ |
| Total equity at time T | 0 | $$E ~:= 0$$ |
|--|--|--|
| Net at time T | 0 | $$ E(T) - I - 12MT $$ |

### Investment of excess cash

| Source | Description | Expression |
|:--------:|:-------:|:--------|
| Upfront Costs | upfront money saved invested over T years | $$(\max(I_o, I_r) - I)(1+R_m)^T$$ |
| Ongoing Costs | monthly money saved invested over T years | $$\int_{0}^{T} (\max(M_o, M_r) - M)(1+R_m)^{T-t} dt$$ |

Where subscripts $$_o$$ and $$_r$$ denote the owning and renting scenarios respectively.

{% endcollapsible %}


<!-- Embed gpt4/index.html
{% include_relative gpt4/index.html %}

 -->

<embed type="text/html" src="gpt4/index.html" width="100%" height="800px;">



## Cost Equations 2

At time 0:
* For a house, we have:
  * Down payment -> upfront cost, goes into real-estate equity at appreciation rate $$R_a$$
  * **Cost:** $$(D+A)V$$
  * **Equity:** $$DV$$
  * **Initial Net Worth:** $$-AV$$
* For renting, we have no upfront costs, so let's assume:
  * "Down payment" instead goes into investment equity at apprecation rate $$R_m$$
  * **Equity:** $$(D+A)V$$
  * **Initial Net Worth:** $$(D+A)V$$

In steady state:
* For a house, we have a mortgage which goes partly towards interest (lost) and partly towards principle (equity):
  * Mortgage 

