webpackJsonp([7],{Jymh:function(n,e){n.exports=[{file:"tdm-model-form.ts",lang:"ts",code:'<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> DynamicFormControlRenderer {\n  item: RenderInstruction;\n  tdmForm: TDMModelForm&lt;<span class="hljs-built_in">any</span>&gt;;\n  fArray: FormArray | <span class="hljs-literal">undefined</span>;\n  fControl: FormControl | <span class="hljs-literal">undefined</span>;\n  fGroup: FormGroup | <span class="hljs-literal">undefined</span>;\n\n  tdmOnControlContextInit?(): <span class="hljs-built_in">void</span> ;\n}',id:"DynamicFormControlRenderer"},{file:"README.md",lang:"md",section:"part1",code:'<p>Building a form with <code>@angular/forms</code> requires a specific template\ndefinition for each control within the form, it is required for both\n<strong>template-driven</strong> and <strong>model-driven</strong> (reactive) forms.</p>\n<ul>\n<li>With <strong>template-driven</strong> forms, all work is done in the templates.  </li>\n<li>With <strong>model-driven</strong> forms some work is done in templates while other\nis offloaded to the component.</li>\n</ul>\n<p>In any case, we end up with work required on the template.</p>\n<p>This is by design, it means that the UI style, behaviour and\nimplementation of controls is setup by the developer and not by the\nforms library, otherwise forms are bound to a specific look &amp; feel\nmaking them useless to most.</p>\n<p><code>ngx-dynamic-forms</code> works the same way, how form controls look, behave\nand work is up to the developer. The library&#39;s UI responsibility is to\nrender the control in the right place with the correct data and state. </p>\n<p>For every form we want to show, <code>@angular/forms</code> requires these\ntemplates, quoting from the angular docs:</p>\n<blockquote>\n<p>Building handcrafted forms can be costly and time-consuming,\nespecially if you need a great number of them, they&#39;re similar to\neach other, and they change frequently to meet rapidly changing\nbusiness and regulatory requirements.</p>\n</blockquote>\n<p>In the last chapter we created a model with metadata describing how it\ninteracts with a form, this information can now be used to create UI\nelements and bind them to the form.</p>\n<p>We do this using a form control renderer (&quot;<strong>renderer</strong>&quot;).</p>\n<h2 id="form-control-renderer">Form Control Renderer</h2>\n<p>A <strong>renderer</strong> is an angular <code>@Component</code> that &quot;knows&quot; how to display\nall possible, form related, UI elements.</p>\n<p>The <strong>renderer</strong>&#39;s &quot;job&quot; is to display a <strong>single</strong> UI element based on\nthe context it receives. <sub>see comment below</sub></p>\n<p>Here are some of the things a <strong>renderer</strong> is responsible for:</p>\n<ul>\n<li>Rendering a UI control based on the type</li>\n<li>Passing metadata to the UI control</li>\n<li>Rendering errors</li>\n</ul>\n<p>Here are some of the things a <strong>renderer</strong> is NOT responsible for:</p>\n<ul>\n<li>State &amp; Error management</li>\n<li>Positioning of form controls</li>\n<li>Adding or Removing of form controls</li>\n<li>Metadata for a form control</li>\n<li>Validation logic</li>\n</ul>\n<div class="alert">\n  A form control template usually include multiple areas such as layout,\n  label, errors, hints, etc...<br>  A <strong>single</strong> UI element refers to the binding between the form control\n  and the template, only one element can be bound. \n</div>\n\n<p>Because the <strong>renderer</strong> is UI specific, i.e. it targets a specific UI\nimplementation, it does not come with the library and must be defined\nby the user.</p>\n<div class="info">\n  A <strong>renderer</strong> component is reusable across applications.\n\n  A <strong>renderer</strong> targeting the <code>@angular/material</code> package can be used\n  in all app&#39;s that use the <code>@angular/material</code> framework. Same goes for\n  other UI framework like bootstrap, etc...\n\n  The demo application contains a comprehensive <strong>renderer</strong> targeting\n  the <code>@angular/material</code> framework, it is planned to release that as\n  a plugin in <code>@tdm/ngx-dynamic-forms</code>, other targets might follow.\n</div>\n\n<p>Another way to look at it is that the <strong>renderer</strong> is an adapter,\nit takes a form control and metadata about it and creates a UI element.</p>\n<h4 id="implementation">Implementation</h4>\n<p>There are multiple ways to implement a <strong>renderer</strong>, in this tutorial we\nwill use the <strong>declarative</strong> approach, the renderer implementation will\nlive mostly in the template using <code>ngSwitchCase</code> statement.</p>\n<p>Here&#39;s a pseudo sample: </p>\n<ul>\n<li>switch TYPE<ul>\n<li>if TYPE is <code>text</code> render <code>&lt;input type=&quot;text&quot; /&gt;</code></li>\n<li>if TYPE is <code>select</code> render <code>&lt;select&gt;&lt;option&gt;&lt;/option&gt;&lt;/select&gt;</code></li>\n<li>...</li>\n</ul>\n</li>\n</ul>\n<p>Another is the <strong>imperative</strong> approach, the renderer implementation will\nbe mostly in the class, programmatically finding the component to render\nand using angular API to instantiate and push it into view. </p>\n<p>This approach give the <strong>renderer</strong> a scent similar to to the\n<code>@angular/router</code>, where each page has a component attached and the\nrouter is the renderer, when a location has changed the router get&#39;s\nmetadata information (URL) and display the proper component.</p>\n<h2 id="building-a-renderer">Building a Renderer</h2>\n<p>One of the definitions for the renderer was: </p>\n<blockquote>\n<p>The <strong>renderer</strong>&#39;s &quot;job&quot; is to display a <strong>single</strong> UI element based\non the context it receives. </p>\n</blockquote>\n<ul>\n<li>What is the context?</li>\n<li>How do we access it?</li>\n<li>When can we access it?</li>\n</ul>\n<h5 id="what-is-the-context">What is the context</h5>\n<p>The context contains the metadata we defined in the <code>@Prop</code> decorator\nwith some additional information populated by the library.</p>\n<p>The context also contains the form control instance to be rendered and\nother form control instances related to that control.</p>\n<h5 id="how-do-we-access-it">How do we access it</h5>\n<p>The context is applied onto the <strong>renderer</strong> instance, making it\naccessible from the renderer&#39;s template.</p>\n<p>For that reason a <strong>renderer</strong> must implement the\n<code>DynamicFormControlRenderer</code> interface.</p>\n',title:"Setup"},{file:"README.md",lang:"md",section:"part2",code:'<p>We will cover this interface in-depth as this tutorial progress.</p>\n<p>For now, we only care about 2 properties:</p>\n<ul>\n<li><p><strong>item</strong>: A instance of <code>RenderInstruction</code>, contains all the\nproperties we defined in the <code>render</code> object within <code>@Prop</code> and\nadditional properties and methods for use.</p>\n</li>\n<li><p><strong>fControl</strong>: The instance of <code>FormControl</code>, this is the form\ncontrol instance we need to bind to the UI element.</p>\n</li>\n</ul>\n<div class="alert">\n  Binding of <code>FormControl</code> or any other class derived from\n  <code>AbstractControl</code> to an UI element requires the element to be an\n   angular directive/component that implements the\n   <code>ControlValueAccessor</code> interface from <code>@angular/forms</code>\n</div> \n\n<h5 id="when-can-we-access-it">When can we access it</h5>\n<p>The context is applied right after the <strong>renderer</strong> class is\ninstantiated, before the <code>OnInit</code> angular life-cycle hook.</p>\n<h2 id="the-simple-renderer">The Simple Renderer</h2>\n<p>Let&#39;s implement a simple renderer. Our renderer is required to render\n<code>text</code> and <code>number</code> fields, that is it.</p>\n<p>We base our model on the famous <code>Hero</code> class:</p>\n',title:"Setup"},{file:"README.md",lang:"md",section:"part3",code:'<p>The <strong>class</strong> implementation is simple, there is no logic or actual\nimplementation other then creating the class and implementing some\nproperties. Everything is done in the HTML template.</p>\n<p>The <strong>template</strong> is a <code>switch</code> expression, written in angular&#39;s\ndeclarative syntax, it&#39;s 100% declarative.</p>\n<div class="alert">\n  This is simplified <strong>renderer</strong> example, not to be used in real\n  application, as we progress we will re-shape it for that purpose.\n</div>\n\n<h4 id="rendering-the-dynamic-form">Rendering the dynamic form</h4>\n<p>First, we need to send our new renderer component to the <code>forRoot</code>\nmethod so it will be the default component to render.</p>\n<blockquote>\n<p>The <code>fotRoot</code> method will automatically register it as <code>enterComponent</code>\nbut it must still register in the <code>declaration</code> array</p>\n</blockquote>\n',title:"Setup"},{file:"README.md",lang:"md",section:"part4",code:"<p>You can see that a form is showing, not a glimmering one but a form it is.</p>\n<p>Notice how <strong>superHero</strong> does not render a form control, it is of type\n<code>boolean</code> and we did not provide a switch statement for that.</p>\n<p>You can toggle the source code button to view it and use the JSON View\nto toggle Model/Form views. Note that model view will reflect form changes\nonly when you commit the form.</p>\n",title:"Setup"},{file:"renderer.component.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { FormGroup, FormArray, FormControl } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/forms\'</span>;\n\n<span class="hljs-keyword">import</span> { RenderInstruction, TDMModelForm, DynamicFormControlRenderer } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'tutorial-simple-renderer\'</span>,\n  templateUrl: <span class="hljs-string">\'./renderer.component.html\'</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TutorialSimpleRendererComponent <span class="hljs-keyword">implements</span> DynamicFormControlRenderer {\n  item: RenderInstruction;\n  tdmForm: TDMModelForm&lt;<span class="hljs-built_in">any</span>&gt;;\n  fArray: FormArray | <span class="hljs-literal">undefined</span>;\n  fControl: FormControl | <span class="hljs-literal">undefined</span>;\n  fGroup: FormGroup | <span class="hljs-literal">undefined</span>;\n}\n',title:"Simple Renderer Class"},{file:"renderer.component.html",lang:"html",section:"default",code:'<span class="hljs-tag">&lt;<span class="hljs-name">ng-container</span> [<span class="hljs-attr">ngSwitch</span>]=<span class="hljs-string">"item.type"</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"{{item.name}}"</span>&gt;</span>{{item.label}}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"{{item.name}}"</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'text\'"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span> /&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"{{item.name}}"</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"\'number\'"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"number"</span> [<span class="hljs-attr">formControl</span>]=<span class="hljs-string">"fControl"</span> /&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">ng-container</span>&gt;</span>\n',title:"Simple Renderer Template"},{file:"simple-renderer.component.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { FORM_CONTROL_COMPONENT } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n<span class="hljs-keyword">import</span> { TutorialSimpleRendererComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">\'./renderer/renderer.component\'</span>;\n\n<span class="hljs-keyword">import</span> { Hero } <span class="hljs-keyword">from</span> <span class="hljs-string">\'./model\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-simple-renderer\'</span>,\n  templateUrl: <span class="hljs-string">\'./simple-renderer.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./simple-renderer.component.scss\'</span> ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SimpleRendererComponent {\n  model = <span class="hljs-keyword">new</span> Hero();\n\n}\n',title:"Component"},{file:"simple-renderer.component.html",lang:"html",section:"tdmDemo",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>',title:"Template"},{file:"model.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Model } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/core\'</span>;\n<span class="hljs-keyword">import</span> { FormModel, FormProp } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>()\n<span class="hljs-meta">@FormModel</span>()\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@FormProp</span>({\n    render: {\n      label: <span class="hljs-string">\'Hero ID\'</span>\n    }\n  })\n  id: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@FormProp</span>({\n    render: {\n      label: <span class="hljs-string">\'Hero Name\'</span>\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@FormProp</span>({\n    render: {\n      label: <span class="hljs-string">\'Super Hero\'</span>\n    }\n  })\n  superHero: <span class="hljs-built_in">boolean</span>;\n}\n',title:"Model"},{file:"model.ts",lang:"ts",section:"plain",code:'<span class="hljs-keyword">import</span> { Model } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/core\'</span>;\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  id: <span class="hljs-built_in">number</span>;\n\n  name: <span class="hljs-built_in">string</span>;\n\n  superHero: <span class="hljs-built_in">boolean</span>;\n}',title:"Model1"}]}});
//# sourceMappingURL=SimpleRendererComponent.f774b4e8b358f0f417be.chunk.js.map