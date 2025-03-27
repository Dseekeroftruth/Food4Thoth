# Animate single img gradient glow border with CSS + SVG filter enhancement

A Pen created on CodePen.io. Original URL: [https://codepen.io/thebabydino/pen/bGPMOpJ](https://codepen.io/thebabydino/pen/bGPMOpJ).

Got the idea after seeing [this](https://www.reddit.com/r/css/comments/1f09511/learn_css_border_animations_in_6_minutes/) and thought a lot of it could be simplified.

For example, these 6 declarations are completely unnecessary:

```
width: 100%; height: 100%;
left: 50%; top: 50%;
translate: -50% -50%;
padding: 3px
```

`inset: -3px`, a single declaration instead of six, achieves the exact same thing.

Writing the `from` keyframe is also unnecessary, since the angle is given an `initial-value` of `0deg` in the `@property` block. So the `from` keyframe can be omitted and it gets auto-generated from the `initial-value` in the `@property` block.

I then also had the idea of enhancing this to both make it work for `img` elements (which can't have pseudos) and make the animated glowy border more interesting by rounding one or both ends, creating a tail, making the glow grainy...

... so enter the SVG `filter` enhancement version you see here! No pseudos!

---

If the work I've been putting out since early 2012 has helped you in any way or you just like it and you wish me to be able to continue putting out stuff, please consider one of the following:

* being a cool cat 😼🎩 and becoming a patron on Patreon

[![become a patron button](https://assets.codepen.io/2017/btn_patreon.png)](https://www.patreon.com/anatudor)

* making a one time donation via Ko-fi

[![ko-fi](https://assets.codepen.io/2017/btn_kofi.svg)](https://ko-fi.com/anatudor)

* making a weekly anonymous donation via Liberapay 

[![Liberapay](https://assets.codepen.io/2017/btn_liberapay.svg)](https://liberapay.com/anatudor/)

* getting me something off my Amazon WishList 

[🎁 🇺🇸](https://www.amazon.com/gp/registry/wishlist/2Y3C4722GXH0I/) / [🎁 🇬🇧](https://www.amazon.co.uk/gp/registry/wishlist/2I25W7U0KADSR/)

* or at least sharing this to show the world what can be done with CSS these days

Thank you!