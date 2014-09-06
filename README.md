Velocity Motion Designer (VMD)
===

**Description**

VMD is a JS script you load onto a page to inject it with animations in real-time. Once you're done animating, you export your the animations into 1-for-1 Velocity code.

Watch this tutorial for a full overview: [Coming Soon](http://ComingSoon.com).

**Notes**

Star/watch this repo in case the embed URL changes.

This package embeds jQuery and Velocity; you do not need to load them in addition to VMD.

VMD remains minified as this repo is not for PR's, but rather bug reports only.

**Usage**

Open up dev tools and paste this into the console:  
```javascript
(function(d) { var vmd=d.createElement("script"); vmd.src="//julian.com/research/velocity/vmd.min.js"; d.body.appendChild(vmd); })(document);
```

Alternatively, add the script to the bottom of your page:  
```html
<script src="//julian.com/research/velocity/vmd.min.js"></script>
```



