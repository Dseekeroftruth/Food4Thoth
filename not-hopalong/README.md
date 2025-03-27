# Not Hopalong

A Pen created on CodePen.

Original URL: [https://codepen.io/Dillo/pen/VYwpwGQ](https://codepen.io/Dillo/pen/VYwpwGQ).

Inspired by [findoff](https://codepen.io/findoff)'s pen [Barry Martin's doileys](https://codepen.io/findoff/pen/rNgjVKY) and derived from my pen [Hopalong](https://codepen.io/Dillo/pen/XJWjRLp).  
In this pen, I am using the same formula, but in a quite different way.  
Normally, the points are drawn at successive positions determined by the iteration of a fairly simple formula .  This formula starts with given x-y coordinates, and uses the three parameters a, b, and c.  
To learn more search the internet for "hopalong attractor".   
Here, I iterate without drawing the intermediate or the final points, hence the "not hopalong". Instead, I use the (x,y) coordinates of the final point to set the color of the starting point.  

You can zoom in or out, grab the canvas to explore different areas of the x-y plane, and set the number of iterations.  
You have some control over the colors too.  

##  The "stretch" function  

As the name suggests, this function allows you to expand the image in one direction without changing the perpendicular direction.  
You can skip it if it seems a bit complicated, but there are many cases where it can achieve much better results.  
The stretch function uses 3 commands :  
-  "off": no stretching. Easy.   
-  "set": Two circles, a red one and a green one are displayed at the center of the canvas. The red one is for reference, and does not move.  The green one can be moved by moving the mouse pointer with the left button pressed. Its direction relative to the red circle gives the direction of the stretch, and its distance the multiplicative factor (1 to 10).  
- "lock": holds the value set with the "set" command, with the zooming and    scanning capabilities of the "off" normal mode.
