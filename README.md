Velocity Motion Designer (VMD)
===

**Description**

VMD is a JS script that you load onto a page in order to enhance it with animations in real-time. Once you're done creating your animations, you export them into 1-for-1 Velocity code.

Watch this tutorial for the full overview: [Coming Soon](http://ComingSoon.com).

**Notes**

Star/watch this repo in case the embed URL changes.

VMD embeds jQuery and Velocity; you do not need to load them beforehand.

VMD is not distributed beyond its minified form since this repo is for bug reports only, not PR's or feature suggestions.

**Usage**

Open up dev tools and paste this into your console:  
```javascript
(function(d) { var vmd=d.createElement("script"); vmd.src="//julian.com/research/velocity/vmd.min.js"; d.body.appendChild(vmd); })(document);
```

Alternatively, add the script to the bottom of your page:  
```html
<script src="//julian.com/research/velocity/vmd.min.js"></script>
```

VMD's documentation is outputted to the console upon load.

**Author**

[Julian Shapiro](http://twitter.com/shapiro).
