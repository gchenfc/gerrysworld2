---
title: "Miller-Rabin Primality Test"
postType: "random"
description: "Cool algorithm for testing if a number is prime."
date: Jan. 28, 2022
---

<!-- Mathjax Support -->
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Why I think this is cool:
* Very fast (much faster than naively checking all numbers up to $$\sqrt{n}$$, for large $$n$$)
* Short, simple code

Contents:
- [Quick-and-dirty Python Code](#quick-and-dirty-python-code)
- [The Test](#the-test)
- [Guaranteed small-number tests](#guaranteed-small-number-tests)
- [Backstory - how I came across this](#backstory---how-i-came-across-this)

---

## Quick-and-dirty Python Code

Reproduced below is my [github gist](https://gist.github.com/gchenfc/8b1442554f969341ec2f4765d60ba7f2) for a super short copy-paste solution (that's admittedly difficult to read/understand).

For a more readable and comprehensive version, check out [my other gist](https://gist.github.com/gchenfc/a0efa92e954a609bf031f7da4cc8dd70).

Finally, also check out [rosettacode.org](https://rosettacode.org/wiki/Miller%E2%80%93Rabin_primality_test#Python) for implementations in tons of other languages and tons of other algorithms!  (I just discovered the site and it's amazing!)

{% highlight python linenos %}
"""
Simple Miller-Rabin Primality Test
Gauranteed correct up to 318,665,857,834,031,151,167,461
(which is >2^64 so works for any uint64)
Usage:
print(is_probably_prime(17))                     # True
print(is_probably_prime(12345678910987654321))   # True
print(is_probably_prime(46))                     # False
"""
_known_primes = (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37)

def _is_composite(n, a, d, s):
    return ((x := pow(a, d, n)) != 1) and (x != n - 1) and (not any(
        (x := (x**2 % n)) == n - 1 for _ in range(s - 1)))

def is_probably_prime(n):
    if n in _known_primes:
        return True
    if any((n % p) == 0 for p in _known_primes) or n in (0, 1):
        return False
    d, s = n - 1, 0
    while d % 2 == 0:
        d, s = d // 2, s + 1  # compute (d, s) s.t. n = d * 2^s + 1
    return all(not _is_composite(n, a, d, s) for a in _known_primes)
{% endhighlight %}

## The Test

See [Wikipedia link](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test), especially the [section on small sets of bases](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test#Testing_against_small_sets_of_bases).

Given a number $$n$$ that you'd like to check is prime or not, first compute the numbers $$d$$ and $$s$$ such that 
&nbsp;$$ n - 1 = 2^s d$$&nbsp;&nbsp; (in other words, factor out all the powers of 2 from $$n-1$$).  Then, for various different choices of $$a$$, check that:

$$
\begin{cases}
a^d \equiv 1 \pmod{n}\\
a^{2^rd} \equiv -1 \pmod{n}, \;\; \forall 0 \le r < s
\end{cases}
$$

If any of these equivalences for any choice of $$a < n$$ are **false**, then $$n$$ is **definitely *not* prime**.

If all the equivalences are **true** after checking a bunch of random choices of $$a$$, then we can be reasonably confident that $$n$$ is **probably prime** (but note that, unless we all the possible choices of $$a$$ according to the [Miller test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test#Miller_test) or the test cases described [next](#guaranteed-small-number-tests), we can't be certain $$n$$ is prime).

## Guaranteed small-number tests

Where this gets interesting is that people have pre-checked lots of numbers!  Copy-pasting from [Wikipedia](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test#Testing_against_small_sets_of_bases):

<blockquote markdown=1>
When the number $$n$$ to be tested is small, trying all $$a < 2(\ln n)^2$$ is not necessary, as much smaller sets of potential witnesses are known to suffice. For example, Pomerance, Selfridge, Wagstaff and Jaeschke have verified that
* if $$n$$ < 2,047, it is enough to test $$a$$ = 2;
* if $$n$$ < 1,373,653, it is enough to test $$a$$ = 2 and 3;
* if $$n$$ < 9,080,191, it is enough to test $$a$$ = 31 and 73;
* if $$n$$ < 25,326,001, it is enough to test $$a$$ = 2, 3, and 5;
* if $$n$$ < 3,215,031,751, it is enough to test $$a$$ = 2, 3, 5, and 7;
* if $$n$$ < 4,759,123,141, it is enough to test $$a$$ = 2, 7, and 61;
* if $$n$$ < 1,122,004,669,633, it is enough to test $$a$$ = 2, 13, 23, and 1662803;
* if $$n$$ < 2,152,302,898,747, it is enough to test $$a$$ = 2, 3, 5, 7, and 11;
* if $$n$$ < 3,474,749,660,383, it is enough to test $$a$$ = 2, 3, 5, 7, 11, and 13;
* if $$n$$ < 341,550,071,728,321, it is enough to test $$a$$ = 2, 3, 5, 7, 11, 13, and 17.
</blockquote>

For example, people have shown through exhaustive testing that, as long as \mathbf{n<1373653}, then $$n$$ is prime *if and only if* the equivalences hold for $$a=2$$ and $$a=3$$!  In other words, you only need to check the equivalences for $$a=2, 3$$ and you're good up to 1373653! (exclamation points used as excited punctuation, not factorials)

For a longer list, check out [OEIS](https://oeis.org/A014233).

Both the code samples [above](#quick-and-dirty-python-code) use these small-number tests instead of using randomly generated values of $$a$$, which is preferable if $$n$$ is larger than the largest guaranteed value.

## Backstory - how I came across this
I was working on a [Project Euler](https://projecteuler.net/archives) problem for fun the other day and, as often occurs in some problems, I needed a quick function for testing whether or not a number is prime.

I lost my previous Project Euler programs to my old laptop (where I had various convenience codes handy) so I made a quick Google search to find a python function for testing if a number is prime.  To my disappointment, almost all the results were either a Sieve of Eratosthenes or of this naive form:
```python
def is_prime(n):
    return all(n % k != 0 for k in range(2, math.ceil(math.sqrt(n))))
```

I felt like there had to be some clever math hacks for more efficient primality checks, especially for the reasonably large numbers I was checking.

I had come across a couple people mentioning the Miller-Rabin test but it looked pretty complicated.  Finally I gave in and decided to read what this mysterious Miller-Rabin test was and I was elated to discover actually it's really simple!!!


