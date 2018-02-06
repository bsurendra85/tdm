webpackJsonp([9],{"K/Qz":function(s,n){s.exports=[{file:"README.md",lang:"md",section:"part1",code:'<p>The renderer we built was simple, just to get us started. Moving forward\nwe need something more capable.</p>\n<p>In this chapter we will refactor the renderer and include support\nfor more types and add custom types.</p>\n<div class="alert">\n  To demonstrate functionality this tutorial will use the\n  <code>@angular/material</code> framework as the core UI framework for forms.\n\n  This should not have an effect, even if you are not familiar with\n  material. \n</div> \n\n<h2><a id="managing-visual-types" class="anchor" href="#managing-visual-types"><span class="header-link"></span></a>Managing visual types</h2><p>A form property metadata includes information about the visual type of\nthe form control it represent&#39;s, it is defined in the <code>renderer.vType</code>\nproperty:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Prop</span>({\n  form: {\n    render: {\n      vType: <span class="hljs-string">\'number\'</span>,\n      label: <span class="hljs-string">\'Hero ID\'</span>\n    }\n  }\n})\nid: <span class="hljs-built_in">number</span>;\n</code></pre>\n<p>This is not the TypeScript type, it is the visual type we want this\nproperty to render as. Based on this value the renderer decides what\nelement to use, it is a <strong>contract</strong> between the renderer and the\ndeveloper building the model.</p>\n<p>Because this is a contract, we enforce it using TypeScript. The <code>vType</code>\nproperty accept&#39;s a specific set of literal string values and any value\nnot in this set will cause TS to throw.</p>\n<p>The library comes with 2 built-in visual types, <code>none</code> and <code>form</code>, they\ndescribe logical controls, controls that does not render on their own.</p>\n<p>Each renderer should come with it&#39;s predefined list of valid virtual\ntypes, extending the library&#39;s list.</p>\n<h4><a id="adding-visual-types" class="anchor" href="#adding-visual-types"><span class="header-link"></span></a>Adding visual types</h4><p>To add a visual type we need to:</p>\n<ol>\n<li>Extend the list of visual types in the type system<br><em>Design-time</em> only, effecting the type system. (no run time effect)</li>\n<li>Implement handling for the visual type in the renderer  </li>\n</ol>\n<p>The visual types are set in the <code>FormElementType</code> interface, let&#39;s\nreview the library definition for <code>FormElementType</code>:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> FormElementType {\n  none: <span class="hljs-built_in">any</span>;\n  form: <span class="hljs-built_in">any</span>;\n}\n</code></pre>\n<p>The property names in the interface are the values acceptable by the\n<code>vType</code> property, the type for each property is used to for <code>data</code>\nobject (more on <code>data</code> in a bit...)</p>\n<p>So, at this point the TypeScript type for <code>vType</code> is:</p>\n<pre class="lang-ts"><code class="lang-ts">  <span class="hljs-keyword">type</span> vType: <span class="hljs-string">\'none\'</span> | <span class="hljs-string">\'form\'</span>;\n</code></pre>\n<p>The simple renderer we built in the previous chapter was capable\nof rendering <code>text</code> and <code>number</code>, let&#39;s review how we implemented the\ntype extension:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { FormElementType } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> \'@tdm/ngx-dynamic-forms/src/interfaces\' {\n  <span class="hljs-keyword">interface</span> FormElementType {\n    text: <span class="hljs-built_in">any</span>;\n    <span class="hljs-built_in">number</span>: <span class="hljs-built_in">any</span>;\n    <span class="hljs-built_in">boolean</span>: <span class="hljs-built_in">any</span>;    \n  }\n}\n</code></pre>\n<p>This will extend the TypeScript type for <code>vType</code>, which is now:</p>\n<pre class="lang-ts"><code class="lang-ts">  <span class="hljs-keyword">type</span> vType: <span class="hljs-string">\'none\'</span> | <span class="hljs-string">\'form\'</span> | <span class="hljs-string">\'text\'</span> | <span class="hljs-string">\'number\'</span> | <span class="hljs-string">\'boolean\'</span>;\n</code></pre>\n<div class="info">\nThe <code>declare module</code> syntax does not compile to runtime code, it is\nused for type declaration. Because <code>FormElementType</code> exists TypeScript\nwill performs augmentation, i.e. extending the type <code>FormElementType</code>.\n<br>\n<br>\nNote that we reference the location of the definition file,\n<code>@tdm/ngx-dynamic-forms/src/interfaces</code> and not <code>@tdm/ngx-dynamic-forms</code>\n</div>\n\n<p>The new renderer we are building is using <code>material</code> which is rich with\nUI elements, let&#39;s extend the visual types so we can use them:</p>\n'},{file:"README.md",lang:"md",section:"part2",code:'<p>This will extend the TypeScript type for <code>vType</code>, which is now:</p>\n<pre class="lang-ts"><code class="lang-ts">  <span class="hljs-keyword">type</span> vType: <span class="hljs-string">\'none\'</span> | <span class="hljs-string">\'form\'</span> | <span class="hljs-string">\'text\'</span> | <span class="hljs-string">\'number\'</span> | <span class="hljs-string">\'boolean\'</span> | <span class="hljs-string">\'radio\'</span> | <span class="hljs-string">\'select\'</span> | <span class="hljs-string">\'password\'</span> | <span class="hljs-string">\'slider\'</span> | <span class="hljs-string">\'slideToggle\'</span> | <span class="hljs-string">\'textarea\'</span>;\n</code></pre>\n<p>We can see we have visual types that represent the same runtime type:</p>\n<ul>\n<li><p><strong>boolean</strong> and <strong>slideToggle</strong><br>Both represent a boolean, true or false. Our renderer will show a\ncheckbox for <strong>boolean</strong> and a slide toggle for <strong>slideToggle</strong></p>\n</li>\n<li><p><strong>radio</strong> and <strong>select</strong><br>Both represent a type that is taken from a specific list.</p>\n</li>\n<li><p><strong>text</strong>, <strong>number</strong>, <strong>password</strong>, <strong>textarea</strong> ...<br>All represent a type, usually <code>string</code> but also <code>number</code>.<br>The visual type will be <code>input</code> but can also be <code>textarea</code>...</p>\n</li>\n</ul>\n<p>This is just a subset of the possibilities.</p>\n<p>Now we can use these literal string values in the <code>vType</code> property.</p>\n<h2><a id="custom-metadata-code-renderer-data-code-" class="anchor" href="#custom-metadata-code-renderer-data-code-"><span class="header-link"></span></a>Custom metadata (<code>renderer.data</code>)</h2><p>Some visual types require specific metadata, a good example is a\n<strong>select</strong> element which requires the options to select from.</p>\n<p>To pass specific metadata set it in the <code>data</code> property.</p>\n<p>Let&#39;s try it with the <strong>slider</strong> component:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Prop</span>({\n  form: {\n    render: {\n      vType: <span class="hljs-string">\'number\'</span>,\n      label: <span class="hljs-string">\'BMI Index\'</span>,\n      data: { min: <span class="hljs-number">1</span>, max: <span class="hljs-number">35</span> }\n    }\n  }\n})\nbmi: <span class="hljs-built_in">number</span>;\n</code></pre>\n<p>The renderer implementation</p>\n<pre class="lang-html"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">mat-slider</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'slider\'"</span>\n            [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span>\n            <span class="hljs-attr">thumbLabel</span>=<span class="hljs-string">"true"</span>\n            [<span class="hljs-attr">tickInterval</span>]=<span class="hljs-string">"1"</span>\n            [<span class="hljs-attr">min</span>]=<span class="hljs-string">"item.data?.min"</span> [<span class="hljs-attr">max</span>]=<span class="hljs-string">"item.data?.max"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mat-slider</span>&gt;</span>\n</code></pre>\n<p>And now with a <strong>select</strong> component:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Prop</span>({\n  form: {\n    render: {\n      vType: <span class="hljs-string">\'select\'</span>,\n      label: <span class="hljs-string">\'Super Power\'</span>,\n      data: { options: [\n        { value: <span class="hljs-string">\'selfHealing\'</span>, label: <span class="hljs-string">\'Self Healing\'</span> },\n        { value: <span class="hljs-string">\'flying\'</span>, label: <span class="hljs-string">\'Flying\'</span> },\n        { value: <span class="hljs-string">\'cloking\'</span>, label: <span class="hljs-string">\'Cloaking\'</span> },\n        { value: <span class="hljs-string">\'cloning\'</span>, label: <span class="hljs-string">\'Cloaning\'</span> },\n        { value: <span class="hljs-string">\'invisibility\'</span>, label: <span class="hljs-string">\'Invisibility\'</span> }\n      ]}\n    }\n  }\n})\nsuperPower: <span class="hljs-built_in">string</span>;\n</code></pre>\n<pre class="lang-html"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">mat-form-field</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'select\'"</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">mat-select</span> [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span>\n              [<span class="hljs-attr">placeholder</span>]=<span class="hljs-string">"item.label"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-option</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let sel of item.data.options"</span> [<span class="hljs-attr">value</span>]=<span class="hljs-string">"sel.value"</span>&gt;</span>{{sel.label || sel.value}}<span class="hljs-tag">&lt;/<span class="hljs-name">mat-option</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">mat-select</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">mat-form-field</span>&gt;</span>\n</code></pre>\n<p>The structure for the metadata is different, depending on the visual\ntype. The library doesn&#39;t validate <code>data</code> at runtime but you can use\nTypeScript to enforce the type using <code>FormElementType</code> by setting the\ntype annotation for the property.</p>\n<div class="alert">\nTo disable type enforcement use <code>any</code> as the type for all visual types\nin <code>FormElementType</code>\n</div>\n\n<p>If you want to enable type enforcement, just set the type to use next to\nthe visual type.</p>\n<p>Taking <strong>select</strong> as an example:</p>\n<pre class="lang-ts"><code class="lang-ts">select: { options: <span class="hljs-built_in">Array</span>&lt;{ value: <span class="hljs-built_in">any</span>; label?: <span class="hljs-built_in">string</span>; }&gt; };\n</code></pre>\n<p>Type enforcement is currently limited because the inferred object from\nthe <code>data</code> property is as a <code>union type</code> of all of the types in\n<code>FormElementType</code>.</p>\n<p>It means that:</p>\n<ul>\n<li>A valid type for <code>data</code> is any of the types set in <code>FormElementType</code></li>\n<li>Setting at lest one type in <code>FormElementType</code> to <code>any</code> will disable\nthe enforcement and anything can be set.</li>\n<li>A visual type that does not require metadata must set the type to\n<code>never</code>. <code>data</code> can still have a value, which is the <code>union type</code> of\nall other types.</li>\n<li>The <code>data</code> property is optional, it can not be forced to become\nmandatory. </li>\n</ul>\n<p>This limitation will probably go way once TypeScript 2.8 will be used.</p>\n<div class="info">\nWhen the library will use TypeScript 2.8 the plan is to dynamically\ncontrol the <code>data</code> property using the type set for it.\n<br>\nCurrently <code>data</code> is optional at all times, with TS 2.8 it will be\nmandatory when a type is set and optional when <code>never</code> is set (<code>x?: any</code>)\n<br>\nWe will also provide an extra type to set a type but make it optional.\n</div> \n\n<h2><a id="validation-errors" class="anchor" href="#validation-errors"><span class="header-link"></span></a>Validation Errors</h2><p>There are many ways to display form errors, most common are per control\nor per form.</p>\n<p>When errors are displayed per form it is probably best to handle them\noutside of the renderer but when the errors are displayed per control\nit is probably best to let the renderer do the job.</p>\n<p>In this tutorial errors are displayed per control and the renderer\nuses the <code>material</code> <code>mat-error</code> component for that.  </p>\n<div class="alert">\n  We will covert validation in the next chapter. \n</div>\n\n<h2><a id="better-renderer" class="anchor" href="#better-renderer"><span class="header-link"></span></a>Better Renderer</h2><p>Below is the source code for our new, better renderer.  </p>\n<p>Notice that the only change is in the template.</p>\n'},{file:"README.md",lang:"md",section:"part3",code:'<div class="info">\n  Notice the only change happens in the model, component and template does not change!\n</div>\n\n<div class="alert">\n  Validation support in this renderer is minimal, showing <code>required</code> errors\n  only.\n\n  To support more errors, especially custom errors, we need to change\n  the way we display errors from a hard-coded approach to a service\n  approach where a service, inject to the renderer, can be queried for\n  error keys and reply with the error itself (good for I18N as well)\n\n</div>\n\n'},{file:"renderer-v2.component.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { FormGroup, FormArray, FormControl } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/forms\'</span>;\n<span class="hljs-keyword">import</span> <span class="hljs-string">\'./renderer-v2.types\'</span>;\n<span class="hljs-keyword">import</span> { RenderInstruction, TDMModelForm, DynamicFormControlRenderer } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'renderer-v2\'</span>,\n  templateUrl: <span class="hljs-string">\'./renderer-v2.component.html\'</span>,\n  styleUrls: [<span class="hljs-string">\'./renderer-v2.component.scss\'</span> ]\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> RendererV2Component <span class="hljs-keyword">implements</span> DynamicFormControlRenderer {\n  item: RenderInstruction;\n  tdmForm: TDMModelForm&lt;<span class="hljs-built_in">any</span>&gt;;\n  fArray: FormArray | <span class="hljs-literal">undefined</span>;\n  fControl: FormControl | <span class="hljs-literal">undefined</span>;\n  fGroup: FormGroup | <span class="hljs-literal">undefined</span>;\n\n  hasError(errorName: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">boolean</span> {\n    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.fControl ) {\n      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.fControl.hasError(errorName);\n    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.fArray ) {\n      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.fArray.hasError(errorName);\n    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.fGroup ) {\n      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.fGroup.hasError(errorName);\n    }\n    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;\n  }\n}\n',title:"Better Renderer Class"},{file:"renderer-v2.component.html",lang:"html",section:"default",code:'<span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngSwitch</span>]=<span class="hljs-string">"item.vType"</span> [<span class="hljs-attr">style.display</span>]=<span class="hljs-string">"item.hidden ? \'none\' : undefined"</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">mat-checkbox</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'boolean\'"</span>\n                [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span>&gt;</span>{{ item.label }}<span class="hljs-tag">&lt;/<span class="hljs-name">mat-checkbox</span>&gt;</span>\n\n  <span class="hljs-tag">&lt;<span class="hljs-name">mat-slide-toggle</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'slideToggle\'"</span>\n                    [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span>&gt;</span>{{ item.label }}<span class="hljs-tag">&lt;/<span class="hljs-name">mat-slide-toggle</span>&gt;</span>\n\n  <span class="hljs-tag">&lt;<span class="hljs-name">ng-container</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'slider\'"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{{item.label}}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-slider</span> [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span>\n                <span class="hljs-attr">thumbLabel</span>=<span class="hljs-string">"true"</span>\n                [<span class="hljs-attr">tickInterval</span>]=<span class="hljs-string">"1"</span>\n                [<span class="hljs-attr">min</span>]=<span class="hljs-string">"item.data?.min"</span> [<span class="hljs-attr">max</span>]=<span class="hljs-string">"item.data?.max"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mat-slider</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">ng-container</span>&gt;</span>\n\n  <span class="hljs-tag">&lt;<span class="hljs-name">ng-container</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'radio\'"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{{item.label}}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-radio-group</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'radio\'"</span>\n                     [<span class="hljs-attr">class.vertical-mat-radio-group</span>]=<span class="hljs-string">"item.data?.vertical"</span>\n                     [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-radio-button</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let sel of item.data.options"</span> [<span class="hljs-attr">value</span>]=<span class="hljs-string">"sel.value"</span>&gt;</span>{{sel.label || sel.value}}<span class="hljs-tag">&lt;/<span class="hljs-name">mat-radio-button</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">mat-radio-group</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-error</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"hasError(\'required\')"</span>&gt;</span>Required<span class="hljs-tag">&lt;/<span class="hljs-name">mat-error</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">ng-container</span>&gt;</span>\n\n  <span class="hljs-tag">&lt;<span class="hljs-name">mat-form-field</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'select\'"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-select</span> [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span>\n                [<span class="hljs-attr">placeholder</span>]=<span class="hljs-string">"item.label"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-option</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let sel of item.data.options"</span> [<span class="hljs-attr">value</span>]=<span class="hljs-string">"sel.value"</span>&gt;</span>{{sel.label || sel.value}}<span class="hljs-tag">&lt;/<span class="hljs-name">mat-option</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">mat-select</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-error</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"hasError(\'required\')"</span>&gt;</span>Required<span class="hljs-tag">&lt;/<span class="hljs-name">mat-error</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">mat-form-field</span>&gt;</span>\n\n  <span class="hljs-tag">&lt;<span class="hljs-name">mat-form-field</span> *<span class="hljs-attr">ngSwitchDefault</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">matInput</span>\n           [<span class="hljs-attr">type</span>]=<span class="hljs-string">"item.vType"</span>\n           [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span>\n           [<span class="hljs-attr">placeholder</span>]=<span class="hljs-string">"item.label"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-error</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"hasError(\'required\')"</span>&gt;</span>Required<span class="hljs-tag">&lt;/<span class="hljs-name">mat-error</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">mat-form-field</span>&gt;</span>\n\n<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n',title:"Better Renderer Template"},{file:"renderer-v2.component.scss",lang:"scss",section:"default",code:'mat-selection-list {\n  <span class="hljs-attribute">max-height</span>: <span class="hljs-number">250px</span>;\n}\n\nmat-radio-group {\n  <span class="hljs-comment">// setting the padding here instead of in the dyn-form-element-container to support ripple animation</span>\n  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">25px</span>;\n  <span class="hljs-attribute">display</span>: flex;\n  <span class="hljs-attribute">flex-direction</span>: row;\n  <span class="hljs-attribute">flex-wrap</span>: wrap;\n\n  mat-radio-<span class="hljs-selector-tag">button</span>:not(<span class="hljs-selector-class">.vertical-mat-radio-group</span>) {\n    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;\n  }\n\n  &amp;<span class="hljs-selector-class">.vertical-mat-radio-group</span> {\n    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">15px</span>; <span class="hljs-comment">// required in case there\'s a scroll</span>\n    <span class="hljs-attribute">overflow-x</span>: visible;\n    <span class="hljs-attribute">overflow-y</span>: auto;\n    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">200px</span>;\n    <span class="hljs-attribute">display</span>: inline-flex;\n    <span class="hljs-attribute">flex-direction</span>: column;\n    <span class="hljs-attribute">flex-wrap</span>: nowrap;\n  }\n}\n',title:"Better Renderer Style"},{file:"renderer-v2.types.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { FormElementType } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> \'@tdm/ngx-dynamic-forms/src/interfaces\' {\n  <span class="hljs-keyword">interface</span> FormElementType {\n    radio: { options: <span class="hljs-built_in">Array</span>&lt;{ value: <span class="hljs-built_in">any</span>; label?: <span class="hljs-built_in">string</span>; }&gt; };\n    select: { options: <span class="hljs-built_in">Array</span>&lt;{ value: <span class="hljs-built_in">any</span>; label?: <span class="hljs-built_in">string</span>; }&gt; };\n    password: never;\n    slider: { min?: <span class="hljs-built_in">number</span>, max?: <span class="hljs-built_in">number</span>};\n    slideToggle: never;\n    textarea: never;\n  }\n}\n',title:"Better Renderer - Types"},{file:"extending-the-renderer.component.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { FORM_CONTROL_COMPONENT } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n<span class="hljs-keyword">import</span> { RendererV2Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'./renderer/renderer-v2.component\'</span>;\n\n<span class="hljs-keyword">import</span> { Hero } <span class="hljs-keyword">from</span> <span class="hljs-string">\'./model\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-extending-the-renderer\'</span>,\n  templateUrl: <span class="hljs-string">\'./extending-the-renderer.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./extending-the-renderer.component.scss\'</span> ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ExtendingTheRendererComponent {\n  model = <span class="hljs-keyword">new</span> Hero();\n\n}\n',title:"Component"},{file:"extending-the-renderer.component.html",lang:"html",section:"tdmDemo",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>',title:"Template"},{file:"extending-the-renderer.component.scss",lang:"scss",section:"default",code:"",title:"Style"},{file:"model.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'number\'</span>,\n        label: <span class="hljs-string">\'Hero ID\'</span>\n      }\n    }\n  })\n  id: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Hero Name\'</span>\n      }\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'boolean\'</span>,\n        label: <span class="hljs-string">\'Has Tracking Device\'</span>\n      }\n    }\n  })\n  hasTracking: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slideToggle\'</span>,\n        label: <span class="hljs-string">\'Double Agent\'</span>\n      }\n    }\n  })\n  doubleAgent: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slider\'</span>,\n        label: <span class="hljs-string">\'BMI Index\'</span>,\n        data: { min: <span class="hljs-number">1</span>, max: <span class="hljs-number">35</span> }\n      }\n    }\n  })\n  bmi: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'select\'</span>,\n        label: <span class="hljs-string">\'Super Power\'</span>,\n        data: {\n          options: [\n            { value: <span class="hljs-string">\'selfHealing\'</span>, label: <span class="hljs-string">\'Self Healing\'</span> },\n            { value: <span class="hljs-string">\'flying\'</span>, label: <span class="hljs-string">\'Flying\'</span> },\n            { value: <span class="hljs-string">\'cloaking\'</span>, label: <span class="hljs-string">\'Cloaking\'</span> },\n            { value: <span class="hljs-string">\'cloning\'</span>, label: <span class="hljs-string">\'Cloning\'</span> },\n            { value: <span class="hljs-string">\'invisibility\'</span>, label: <span class="hljs-string">\'Invisibility\'</span> }\n          ]\n        }\n      }\n    }\n  })\n  superPower: <span class="hljs-string">\'selfHealing\'</span> | <span class="hljs-string">\'flying\'</span> | <span class="hljs-string">\'cloaking\'</span> | <span class="hljs-string">\'cloning\'</span> | <span class="hljs-string">\'invisibility\'</span>;\n}\n',title:"Model"}]}});
//# sourceMappingURL=ExtendingTheRendererComponent.a28ddfe96c94e455bfc1.chunk.js.map