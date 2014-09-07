Velocity Motion Designer (VMD)
===

**Description**

Watch the video for a full overview: [youtube.com/watch?v=7IxhIMIdkPs](https://www.youtube.com/watch?v=7IxhIMIdkPs&hd=1).

VMD is a JS snippet that you load onto a page in order to create animations in real-time. Once you're done creating, you can export your work into 1-for-1 [Velocity](http://VelocityJS.org) code. (The code is also compatible with jQuery and GSAP -- just skip the delay option and only use CSS properties that those libraries support.)

VMD saves countless hours of dev time by preventing constant IDE <--> browser switching and repeated UI state reconstructing. Further, it streamlines the designers <--> developer workflow by allowing them to work alongside one another in real-time.

**Documentation**

VMD's documentation is outputted to the browser console upon script load.

**Usage**

Add this to the bottom of your page:  
```html
<script src="//julian.com/research/velocity/vmd.min.js"></script>
```

Alternatively, open up dev tools and paste this into your console:  
```javascript
(function(d) { var vmd=d.createElement("script"); vmd.src="//julian.com/research/velocity/vmd.min.js"; d.body.appendChild(vmd); })(document);
```

**Important**

Star/watch this repo in case the embed URL changes.

VMD includes jQuery and Velocity; you do not need to load them beforehand.

VMD is not distributed beyond its minified form since this repo is for bug reports only, not PR's or feature suggestions.

**Author**

[Julian Shapiro](http://twitter.com/shapiro)
