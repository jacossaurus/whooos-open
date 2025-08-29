# Whooo's Open? 🦉 (iOS and iPadOS Widget)
A widget to quickly see servery hours on campus at Rice University.

![Preview](assets/preview.jpgg)

<b>Note</b>: the hours have been hardcoded, meaning any changes to their regular hours will <b>NOT</b> be shown.

Requires <a href="https://scriptable.app/">Scriptable</a> on the App Store.

## Instructions
- Open Scriptable and tap the plus icon.
- Copy the text in <a href="/build/widget.js">widget.js</a> (found in `build` of this repo) and paste into the script.
- Go to your Home Screen, hold down, and add a widget.
- Select Scriptable as the application.
- Select the Medium size.
- Select the correct script to run.

## Optional
The widget can also sort serveries based on which is closest to you. This feature is disabled by default. To enable it, enter any truthy value into the parameter space. If metric units are wanted, enter "metric".