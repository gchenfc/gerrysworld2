---
title: "Calculating Cost of Death Risk"
postType: "random"
description: "Cost of travel including costs due to productivity loss and chance of death."
date: Apr. 15, 2022
---

<!-- Mathjax Support -->
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

<style>

.MJXc-display > .mjx-chtml {
    overflow-x: scroll;
    max-width: 100%;
}

</style>

<div class="wrap-collapsible">
  <input id="collapsible" class="toggle" type="checkbox" checked> <!-- delete "checked" to default to unchecked -->
  <label for="collapsible" class="lbl-toggle">Contents</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

- [Background](#background)
- [Cost Calculations](#cost-calculations)
  - [Direct Costs](#direct-costs)
  - [Cost of lost productivity](#cost-of-lost-productivity)
  - [Cost of death](#cost-of-death)
    - [Chance of death](#chance-of-death)
    - [Expected value of days lost](#expected-value-of-days-lost)
      - [Justification of equivalence](#justification-of-equivalence)
      - [Evaluation](#evaluation)
- [Final Cost Tables](#final-cost-tables)
  - [Transportation](#transportation)
  - [Lodging](#lodging)
  - [Final Options](#final-options)

</div>
  </div>
</div>

# Background
I'm planning a day-trip and trying to weight my travel options.  I want to include the following costs:

* Direct $ cost
* lost productivity ("opportunity cost" ???)
* chance of death

I normalize everything to dollars to make them more comparable/tangible.

TL;DR: check out my [spreadsheet](https://docs.google.com/spreadsheets/d/1G3o4JAGevMSbBjloDhWEH9Z5UhgJwaeFa2cRryaxBQ4/edit?usp=sharing).  I decided to bus.

# Cost Calculations

## Direct Costs

This is easy to calculate, e.g. cost of bus/plane tickets, cost of gas, etc.  Factoring in vehicle depreciation was the trickiest part - since I have a 12-year old vehicle with 200k miles, I just roughly estimated $0.10 / mile, which is on the low end of typical depreciation estimates.  As you'll see, this didn't end up making a difference since my car has such bad mileage that it's cheaper to rent a car anyway.

## Cost of lost productivity

This is also pretty easy to calculate.  Since this is happening on a weekend and my weekends are usually just me sleeping most of the day anyway, I valued my time at a measly $5 / hour.  I also give multipliers for how "productive" I could be on a bus vs plane.

## Cost of death

This is an interesting one.  First I calculate chance of death, then the expected value of days of my life lost, then convert to dollars.

### Chance of death
First calculate the chance of death.  This is easy to do at a first-order approximation - passenger cars have ~1.5 deaths / billion vehicle miles according to NHTSA.  Buses are [purportedly 50 times safer](https://www.bus.com/blog/safest-mode-of-transportation/) than passenger cars, and planes 750 times safer.  More accurate calculations are tricky for a number of reasons:
* actually a lot of the deaths due to cars are e.g. pedestrian deaths, not passenger deaths
* car safety ratings matter
* my driving abilities matter - I give a 1.5 multiplier since I consider myself a below-average driver
* time of day matters
* geographical location matters (e.g. easy highway vs busy metro city)
* non-fatal injury is not accounted but does matter

In any case, I just use the first-pass approximation.

### Expected value of days lost

We could analyze this 2 ways:
1. what is the cost of going on the trip in the first place
2. assuming I am definitely going on the trip, what's the cost of death for different options?

I'm pretty sure these both turn out to be very nearly equivalent.  Let me explain why.

#### Justification of equivalence

First, option 2 is easy to calculate: just multiply the (probability of death) by the (sum of all future joys) to figure out how much joy you've lost by exposing yourself to death risk.

<div style="width: 100%; overflow-x: scroll;">
$$ \boxed{\text{Cost due to chance of death} = (\text{probability of death}) \cdot (\text{sum of all future joys})} \tag{1}\label{eq:cost_to_chance_of_death} $$
</div>

Option 1 is more interesting.  The formula should be something like:

$$ E[\text{no trip}] - E[\text{yes trip}] $$

where $$ E[\cdot] $$ denotes the expected value.  "no trip" means I never went on the trip, while "yes trip" means I did go on the trip, and took a given mode of transportation.
Expanding out $$ E[\text{yes trip}] $$,

$$ E[\text{yes trip}] = P(\text{not dying})V(\text{not dying}) + P(\text{dying})V(\text{dying}) $$

where $$ P(\cdot) $$ denotes the probability of an event occuring, and $$ V(\cdot) $$ denotes the value/joy derived from that event occurring.
Both "not dying" and "dying" are assuming we did go on the trip.  Note that obviously $$ V(\text{dying}) = 0 $$ since we will never achieve any joy ever again by dying.

$$ V(\text{not dying}) = V(\text{no trip}) + V(\text{the trip itself}) $$

here, $$ V(\text{the trip itself}) $$ denotes the joy I derive from going on the trip.  Then,

$$ \begin{align*}
E[\text{yes trip}] &= [1-P(\text{dying})][V(\text{no trip}) + V(\text{the trip itself})] + P(\text{dying})\cdot 0 \\
    &= 1\cdot V(\text{no trip}) - P(\text{dying}) V(\text{no trip}) + (1-P(\text{dying})) V(\text{the trip itself}) \\
    &= E[\text{no trip}] - P(\text{dying}) V(\text{no trip}) + (1-P(\text{dying})) V(\text{the trip itself}) \\
    &\approx E[\text{no trip}] - P(\text{dying}) V(\text{no trip}) + V(\text{the trip itself})
\end{align*} $$

So the cost ( cost = -value ) of going on the trip is:

$$ E[\text{no trip}] - E[\text{yes trip}] = P(\text{dying}) V(\text{no trip}) - V(\text{the trip itself}) $$

To do a quick check to see if the trip is worth it in the first place, we calculate $$ P(\text{dying}) V(\text{no trip}) $$ and see if it's reasonable.  To compare different transportation methods, the $$ V(\text{the trip itself}) $$ term will cancel and we just compare $$ P(\text{dying}) V(\text{no trip}) $$ for the different methods.  So in other words, the value of we need to calculate is $$ P(\text{dying}) V(\text{no trip}) $$, or in other words, (probability of death) $$\cdot$$ (sum of all future joys), which is exactly the same as Eq. \eqref{eq:cost_to_chance_of_death} in option 2.  (QED)

#### Evaluation
In section [Chance of death](#chance-of-death) we already calculated $$ P(\text{dying}) $$ so now we just need to calculate $$ V(\text{no trip}) := (\text{sum of all future joys})$$.

This depends heavily on both the probability of death vs age curve (e.g. "# of lives" column of [an Actuarial Life Table](https://www.ssa.gov/oact/STATS/table4c6.html)) and also the utility of a year of life at a given age (presumably younger years are more valuable than older years).

I just make a 0th order approximation that when you multiply these two together and average over all future years, 1 year is approximately worth 0.5 "units" where I define a "unit" to be the value of one year at my current age.  My logic is that when multiplying together the death curve with the joy/utility curve, it will be something like a line that starts at 1 right now and ends at 0 at age 75, so the average will be 0.5.

At age 25 and assuming life expectancy 75, that's

$$ (50 \text{ years}) \cdot (0.5 \text{ joy-years/year}) \cdot (365 \text{ days / year}) = 9125 \text{ joy-days} $$

Finally, to convert to dollars, I make the rough approximation that the value of 1 day is worth $400.  This is based on the fact that I would work for about $50-100/hour for 40 hours / week; and, as a rational being, that is "worth it" to me, so that must be a reasonable estimate of my day's worth.  That makes $2000-4000 / week = $286-571 / day, so I say roughly $400 is reasonable.  Note that if I thought my day was worth more, I would work fewer hours; and if I thought my day was worth less, I would work more hours.  There's some subtlety here that I'm missing but in any case, I think it's a reasonable estimate.

Then I arrive at the figure,

$$ (\text{sum of all future joys}) \approx (9125 \text{ joy-days}) \cdot ($400 / \text{joy-day}) = $3.65 \text{ million} $$

Then the cost of traveling due to chance of death according to Eq. \eqref{eq:cost_to_chance_of_death} is

$$ \boxed{P(\text{dying}) \cdot ($3.65 \text{ million})} $$

# Final Cost Tables

## Transportation

<div style="overflow-x: auto" markdown="1">

|  | Direct Cost    | Productivity cost | Chance of Death | Expected cost of lost joy-days | $-equivalent joy-day cost |
| -------------- | ------- | ----------------- | --------------- | ------------------------------ | ------------------------- |
| Car            | $254.82 | $63.33            | 0.0000171       | 0.1560375                      | $62.42                    |
| Rental Car     | $174.60 | $63.33            | 0.00002565      | 0.23405625                     | $93.62                    |
| Bus            | $80.00  | $23.75            | 0.000000342     | 0.00312075                     | $1.25                     |
| Plane          | $400.00 | $30.00            | 0.0000000228    | 0.00020805                     | $0.08                     |

</div>

## Lodging

<div style="overflow-x: auto" markdown="1">

| LODGING | Direct Cost   |
| ------- | ------ |
| Airbnb  | $68.50 |
| Hotel   | $87.50 |

</div>

## Final Options

<style>
    .myTable tr:nth-child(3) { background: lightgreen; }
</style>

<div class="myTable" style="overflow-x: auto" markdown="1">

|                | Direct Cost | Cost (including cost of death) | Cost (including cost of productivity + death) |
| --------------------- | ------------- | ------------------------------ | --------------------------------------------- |
| Rental + Sleep in car | $174.60       | $268.22                        | $331.56                                       |
| Car + Sleep in car    | $254.82       | $317.24                        | $380.57                                       |
| Bus + AirBnB          | $148.50       | $149.75                        | $173.50                                       |

</div>
