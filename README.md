# About this project

The project is only a prototype of video annotation, which is used to demonstrate how the user experience of annotating on video. And I have used it on our own business project.

I create it with the help of my other [library](https://github.com/paohuoche/react-drawing-library). Here, I remove some unnecessary little features and interact with the backend.

Hope it can give you guys a little inspiration.

# What it looks like

![alt text](https://github.com/paohuoche/video-annotation/blob/376222385a64dff45c206bc58e1f5f529eded358/screenshot.png)

# How to use it

## Drawing

Before drawing, You have to finish three selections: **Shape, Classification, and Group**.

**Shape**: In the middle of the header of the page layout. when any type of shape is selected, it will float up and turn red. To clear the shape selection, simply click on the selected shape again.

**Classification**: At the top of the sidebar, there are three classifications in the demo, you can check out the effects of selected.

**Group**: A single group has a specified time range: start frame number and end frame number. All the shapes drawn within the specified time range will be treated as a group of shapes. To create a new group, just click the shear icon, then you can see a green rectangle on the progress bar. Simply drag its two sides, changing the start and end frame.

The order in which you complete these three selections does not matter. After finishing them, you will be able to draw shapes.

## Modification

You have to clear the shape selection first. 

If you want to change the size of the rectangle, click on the target one, then you can see four anchors, and drag it.

If you want to change position, simply drag on the shape.

If you want to delete, right-click on any shape that you want to delete.

## Player

The operation is pretty much the same as others that we are used to doing. Besides those, I add a preview feature, it will be active by clicking on that film icon. Also s
