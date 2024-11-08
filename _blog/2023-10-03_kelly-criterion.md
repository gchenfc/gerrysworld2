---
title: "Kelly Criterion"
postType: "random"
description: "Explaining some supposedly obvious facts (but not obvious to me) about diversification and leverage using the Kelly Criterion (for sizing a bet)."
date: Oct 3, 2023
stylesheets: ["/css/blogPost.css"]
redirect_from: "/blog/2023-10-03.html"
---

<!-- Mathjax Support -->
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Disclaimer: I am no expert and have no formal financial education.  I just like math and formulating ideas based on what I believe the math says.  I learned about this (Kelly Criterion) in April and shared it with some friends but forgot to create a blog post on it till just now.

## TL;DR

Even if expected return of a bet is >1 (e.g. pay $1, expect on average to get back $1.05), the optimal amount to bet may not be infinity dollars because you have to subtract off a bias factor due to variance. Instead, the equation for the optimal bet is a percentage of your total bankroll and depends on both the expected return and the variance of the bet.

<span style="color:red">TODO: add more thoughts on this when I have time.  It's very interesting and I didn't have time at the time to finish this blog post.</span>

### The Questions:
For someone with no psychological risk aversion:
* *Why would one bet anything less than infinite money (borrow as much as possible to bet with) on a bet with positive expected return?*
* *Why does diversification / risk reduction have any utility?*

## Introduction

If you were like me, you may have thought (incorrectly) something along the following:
> Given a bet with expected return greater than 1 (e.g. pay $1, expect on average $1.05 in return), the optimal action is to bet infinite money.

This lead me to the conclusion that, as an example, one should take as much debt as possible to invest in a broad-market index fund, since the expected return is greater than 1, as long as the debt terms were favorable enough.

However, one hiccup with such a strategy is that a margin call could blow up your entire portfolio.  This starts hinting at a gambler's ruin aspect to the problem:
> [...] A persistent gambler with finite wealth, playing a fair game [...] will eventually and inevitably go broke against an opponent with infinite wealth. [^1]

[^1]: [Gambler's Ruin](https://en.wikipedia.org/wiki/Gambler%27s_ruin)

As it turns out, this applies not only to leveraging oneself, but to ordinary bets as well.  In the simplest case, the *Kelly Criterion* defines the optimal bet size to maximize long-term growth rate of wealth.  It states, roughly, that **for a bet with expected return $$b$$ and probability of success $$p$$, the optimal bet size as a percentage of your portfolio can be computed as $$f^* = p - \frac{1-p}{b}$$.**

## Definition

Quoting from Wikipedia[^2]:
> In probability theory, the Kelly criterion (or Kelly strategy or Kelly bet) is a formula for sizing a bet. The Kelly bet size is found by maximizing the expected value of the logarithm of wealth, which is equivalent to maximizing the expected geometric growth rate.

[^2]: [Kelly criterion](https://en.wikipedia.org/wiki/Kelly_criterion)

Notice (if you read the Wikipedia article) that the Kelly Criterion relies on the fact that the utility of money increases with the *log* of money.  Although this seems like a pretty arbitrary and strong assumption, realize that:
1. This is actually another way of saying we want to maximize the growth *rate* of our money, since $$\log Pe^{rt} = rt \log P$$ which is proportional to the growth rate $$r$$.
2. The intuition that there's a "sweet spot" to bet remains and can still be illustrated through another example:

<div class="wrap-collapsible">
  <input id="collapsible-1" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="collapsible-1" class="lbl-toggle">Example</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

<!-- #### Example -->
Consider a game that is 50-50 and returns 0.5 on a loss and 1.6 on a win.  The expected value after one play is 1.05, so a gut instinct might be to always play this game with all the money you have.  But a quick analysis will show that always betting all your money will almost certainly bankrupt you.  For example, after 100 plays, we expect on average 50 wins and 50 losses, which will leave us with $$P (0.5)^{50} (1.6)^{50} = P(0.5\cdot 1.6)^{50} = P(0.8)^{50}$$ of our original money.  If we start with $1000, we're more likely than not to end with less than 1.5 cents!  Weird right?

The reason this feels so weird is because repeated betting acts like products (logarithms) rather than sums (the geometric mean of 0.5 and 1.6 is $$0.8944...=\sqrt{0.8}$$).  This is also of course the same reason compounding is so powerful :).

</div>
  </div>
</div>

<div class="wrap-collapsible">
  <input id="collapsible-2" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="collapsible-2" class="lbl-toggle">Sample Derivation for 2-Outcome Game</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>
<!-- #### Sample Derivation for 2-Outcome Game -->

If, instead of betting *all* of our money each time we only bet some percentage $$f$$ of our money each time, our return after $$n$$ successes out of $$N$$ plays is:

$$ 
\begin{align}
P \left[(1-f) + f (1 + b)\right]^n \left[(1-f) + f (1 - a)\right]^{N-n} &= P(1+bf)^n(1-af)^{N-n}
\end{align}
$$

where we define $$a := 0.5$$, $$b := 0.6$$ is the amount lost and gained, respectively, on a loss/win.  $$(1-f)$$ denotes the amount we don't bet with (reserve as savings) on a single play, and $$f (1+b)$$ and $$f (1-a)$$ denote the return on a win/loss, respectively.

If we want to maximize the expected log money, define $$p$$ is the probability of success on one bet, and maximize the expected value of the log money with respect to $$f$$:

$$
\begin{align}
  f^* &= \arg\max_f \sum_{n=0}^{N} p(n=n) \left( \log P + n\log (1+bf) + (N-n)\log (1-af)\right) \\
      &= \arg\max_f \sum_{n=0}^{N} p(n=n) \left( n\log (1+bf) + (N-n)\log (1-af)\right) \\
      % &= \arg\max_f \sum_{n=0}^{N} \frac{n!(N-n)!}{N!}p^n(1-p)^{N-n} \left( n\log (1+bf) + (N-n)\log (1-af)\right) \\
      &= \arg\max_f \left(\log(1+bf) \left(\sum_{n=0}^{N} np(n=n)\right) + \log(1-af) \left(\sum_{n=0}^{N} (N-n)p(n=n)\right)\right) \\
      &= \arg\max_f \left(\log(1+bf) E_{p}[n] + \log(1-af) E_{1-p}[n]\right)
\end{align}
$$

where $$E_{p}[n]$$ denotes the expected value of the number of successes $$n$$ given $$N$$ plays of success probability $$p$$ is "obvisouly" $$pN$$.
<!-- , but can be computed as
$$
\begin{align}
\sum_{n=0}^{N} n \frac{n!(N-n)!}{N!}p^n(1-p)^{N-n} &= \sum_{n=0}^{N} n \frac{n!(N-n)!}{N!}p^n(1-p)^{N-n}
\end{align}
$$ -->
Then differentiating and setting to 0,

$$
\begin{align}
    0 &= \frac{b}{1+bf^*} Np - \frac{a}{1-af^*} N(1-p) \\
    bp - abf^*p &= a(1-p) + abf^*(1-p) \\
    f^* &= (bp - a(1-p))\frac{1}{ab(p + (1-p))} \\
        &= \frac{p}{a} - \frac{1-p}{b},
\end{align}
$$

which matches the expression on [Wikipedia](https://en.wikipedia.org/wiki/Kelly_criterion#Investment_formula) for the partial-loss generalization.

</div>
  </div>
</div>


## Intuition
<div class="wrap-collapsible">
  <input id="collapsible-3" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="collapsible-3" class="lbl-toggle">Intuition</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

Here are a few intuitive ways to realize that there must exist some optimal bet size that is less than infinite:

1. Gambler's ruin: there's some non-0 probability you go broke and get to zero dollars, at which point you can never bet ever again to recover your losses.
2. The convolution in the pdf space is not perfect due to the fact that anything below $0 doesn't convolve as we expect.  To expand, normally the expected value after 10 bets should be the convolution of the pdf of ... actually on second thought the convolution will occur in log-money space which doesn't have this problem.  I'll have to think about this more.
3. The differential equation describing pdf of money over time is not linear: it has a discontinuity at money=0.  On second thought, possibly same deal with convolution in log-money space.

I need to think about this more.

</div>
</div>
</div>

## Relationship to Diversification

I always thought diversification was kind of dumb because:
* diversification helps you reach a better tradeoff between risk and return "for free", but
* why do you care about risk at all?

It turns out, risk *does* tangibly impact your returns and isn't purely for psychological comfort.  **The Kelly Criterion mathematically alludes to the fact that higher risk (higher variance) leads to lower expected long-term returns**.  An indirect way of thinking of this is that higher variance implies a smaller optimal bet size, which implies lower expected returns.  A more direct way of coming to this conclusion can be found in the derivation of the Kelly Criterion.

## References
