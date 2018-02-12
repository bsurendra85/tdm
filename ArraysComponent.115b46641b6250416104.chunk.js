webpackJsonp([21],{ljOi:function(s,n){s.exports=[{file:"README.md",lang:"md",section:"part1",code:'<h1><a id="arrays" class="anchor" href="#arrays"><span class="header-link"></span></a>Arrays</h1><p>An array is a collection of items which we add, remove or move.<br>This is a unique data structure which requires specific handling in both\nlogical and visual aspects.</p>\n<h2><a id="formarray" class="anchor" href="#formarray"><span class="header-link"></span></a>FormArray</h2><p>In <code>@angular/forms</code> arrays are represented by the <code>FormArray</code> class.</p>\n<p>Quoting from the angular docs:</p>\n<blockquote>\n<p><code>FormArray</code> is one of the three fundamental building blocks used to\ndefine forms in Angular, along with <code>FormControl</code> and <code>FormGroup</code>.</p>\n</blockquote>\n<p>Structure wise, we can catalog <code>FormArray</code> and <code>FormGroup</code> as\n<strong>containers</strong> because they contain other control, including themselves.</p>\n<p>The array container is unique because it is considered dynamic, we can\nadd remove or move items in it.</p>\n<div class="alert">\n  While there is no limitation on removing or adding controls to a\n  <code>FormGroup</code> the library does not support that.\n\n  <code>FormGroup</code> represents the structure of a model and it does not make\n   sense to change the structure of a typed model. \n</div> \n\n<p>In angular, An instance of <code>FormArray</code> is not bound to a specific type.\nThis makes since because a control has no type information, it doesn&#39;t\ncare about the value it holds.</p>\n<p>The library however, works in a typed environment and assumes that\narray has a defined type.</p>\n<div class="info">\n  This assumption does&#39;nt mean you can not work with untyped arrays, it\n  only means it is not supported out of the box and you will need to\n  handle it manually.<br></div> \n\n<h2><a id="array-metadata" class="anchor" href="#array-metadata"><span class="header-link"></span></a>Array metadata</h2><p>Form control definitions have no reference to the use of arrays.<br>Using arrays does not require specific annotation, except for 1 specific\ncase which is not related to the library and will be covered next.</p>\n<p>It means that we define our models and the metadata as is, nothing\nspecial for arrays. It also mean that array&#39;s support, out of the box,\nthe use of other complex data structures including the <code>flatten</code>\nfeature and <code>childForm</code> feature.</p>\n<div class="alert">\nWhile <strong>flattening</strong> is supported it is highly recommended <strong>not</strong> to\nuse flattening with arrays.\n<br>\n<br>\nThe are many reason to avoid this scenario, use <code>childForm</code> instead.\n<br>\n<br>\nUsing <strong>flattening</strong> declarations with arrays will most definitely\nrequire custom renderer implementation, a very complex one. \n</div>\n\n<h2><a id="displaying-arrays" class="anchor" href="#displaying-arrays"><span class="header-link"></span></a>Displaying arrays</h2><p>Similar to <a class="tdm-anchor-trap" href="../child-form#displaying-a-child-form">Child Forms</a>\ndisplaying arrays is a challenge. There are multiple ways to display\narrays, some are based on preferred style and some based on the context.\nDo we allow add/remove/move operations or only modifying existing items?\nWhere do we put the buttons? how do the buttons apply text, icons? Can\nwe multi-select? it has no end.</p>\n<p>This is a greater challenge, it requires control over the layout,\nbehaviour and state of UI elements. For example, when the user want to\ndisable the <strong>add</strong> or <strong>edit</strong> buttons based on domain logic.</p>\n<h3><a id="tools" class="anchor" href="#tools"><span class="header-link"></span></a>Tools</h3><p>The library provide tools that help working with arrays, we covered some\nof the imperative tools that help us manipulate the form in the\n<a class="tdm-anchor-trap" href="../control-panel">Control Panel</a> chapter.</p>\n<p>There are also declarative tools, one of them is the <code>*forFormArray</code>\nstructural directive which is a <code>*ngFor</code> like directive that accepts a\n<code>FormArray</code> instance and it&#39;s <code>RendererInstruction</code> and returns a\ncollection of <code>DynamicControlRenderContext</code> to iterate over, i.e give me\nthe form array and the instructions for it and I will return a\ncollection of context items to render. <code>DynamicControlRenderContext</code> is\nwhat sent to the renderer, it is what we render with.</p>\n<p>Same as child forms, the renderer&#39;s implementation decides what we can\nand can not do and what trade-off&#39;s apply. </p>\n<h3><a id="material-renderer" class="anchor" href="#material-renderer"><span class="header-link"></span></a>Material renderer</h3><p>The material renderer comes with array support.</p>\n<p>Support requires choosing style, this is why the array support is\n<em>opinionated</em>,</p>\n<p>Array&#39;s are rendered using the <code>mat-list</code> component and an action row\nfor add/remove/edit.</p>\n<p>Primitives are rendered inline, i.e. they appear as is within a list.<br>Child forms are rendered as a single readonly value and editable via the\n<strong>edit</strong> button. The renderer will not show any child form when edit is\nclicked, it will emit an event which the user can use to render the\nchild form. </p>\n<blockquote>\n<p>Child forms are rendered as a single readonly value</p>\n</blockquote>\n<p>A child form is a model, to display a child form as a single readonly\nvalue the material renderer extends the <code>RenderDef</code> type so it now\naccepts the optional property <strong>identity</strong>, this is the property name\non the child form to display as a readonly value representing the model.</p>\n<p>If not set the child form will not display as an array!</p>\n<h2><a id="example" class="anchor" href="#example"><span class="header-link"></span></a>Example</h2><p>The example below uses the material renderer. While primitive arrays\nwill work as is array&#39;s of child form types will require the host of\nthe form to provide a way to show them.</p>\n<p>For this we use the <strong>(rendererEvent)</strong> <code>@Output</code> and listen to the\n<code>ChildFormEditRendererEvent</code> event. When the event fire we will show\nthe new form and hide the previous form from the view. We will do it\nusing animation like it is done in the material tab component.</p>\n<p>What we get is a <em>chainable form</em>, a form that can jump to another\nform and back without a limit to the depth of the chain.</p>\n<p>The component implements internal logic to manage the stack of forms\nand the animation. The logic for add/remove and reset of forms comes\nfrom the material renderer. </p>\n<p>To demonstrate array&#39;s we need to have them in `Hero, we will add a\nprimitive array and a child form array.</p>\n<h3><a id="extending-code-hero-code-" class="anchor" href="#extending-code-hero-code-"><span class="header-link"></span></a>Extending <code>Hero</code></h3><p>First array we add is an array of a primitive type, a list of allies\nreferenced by name:</p>\n<pre class="lang-ts"><code class="lang-ts">  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Allies\'</span>\n      }\n    }\n  })\n  allies: <span class="hljs-built_in">string</span>[];\n</code></pre>\n<div class="info">\n  Setting <code>required</code> validation on an array means it must have at least\n  one item \n</div>\n\n<p>The second array is an array of a <code>HeroAddress</code> making our <strong>address</strong>\nproperty an array instead of a single instance.</p>\n<pre class="lang-ts"><code class="lang-ts">  <span class="hljs-meta">@Prop</span>({\n    <span class="hljs-keyword">type</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> HeroAddress,  <span class="hljs-comment">// SEE "The array type limitation" below</span>\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'form\'</span>,\n        label: <span class="hljs-string">\'Address\'</span>,\n        identity: <span class="hljs-string">\'street\'</span>\n      },\n      childForm: <span class="hljs-literal">true</span>\n    }\n  })\n  address: HeroAddress[];\n</code></pre>\n<p>Notice how there is no change to the form definitions.</p>\n<div class="alert">\nWe mentioned that material require array of child forms to specify the\nidentity property, here we set it to <strong>street</strong>, which is what we\nwill see as a readonly value in the list.\n<br>\n<br>\nThis is not the identity of a model, as defined in <code>@tdm/core</code>.\n</div>\n\n<p>Another property added is the <strong>brother</strong> property:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-meta">@Prop</span>({\n  form: {\n    render: {\n      vType: <span class="hljs-string">\'form\'</span>,\n      label: <span class="hljs-string">\'Brother\'</span>\n    },\n    childForm: <span class="hljs-literal">true</span>\n  }\n})\nbrother: Hero;\n</code></pre>\n<p>The brother property is child form of <code>Hero</code>, it is added just to show\nthe chainable form behaviour, it allows adding infinite number of chains.</p>\n<p>In chapter <a class="tdm-anchor-trap" href="../child-form#displaying-a-child-form">Child Forms</a>\nwe used an outlet to show the child form, here we use the\nrenderer event to capture a new child form and show it as a chained\nform, this time it&#39;s not part of the array.</p>\n<div class="info">\nThis page implementation of a chainable form could be ported into a\ncomponent of it&#39;s own, wrapping <code>&lt;dynamic-component&gt;</code>,\ne.g. <code>&lt;chainable-dynamic-component&gt;</code>.\n</div>\n\n<p>We populate the hero with some data, specifically 2 <code>HeroAddress</code>\ninstances, with 1 of them invalid.</p>\n'},{file:"README.md",lang:"md",section:"part2",code:'<h2><a id="the-array-type-limitation" class="anchor" href="#the-array-type-limitation"><span class="header-link"></span></a>The array type limitation</h2><p>We mentioned 1 specific case when we need to modify our metadata when\nusing arrays, this is when we want the library to know what is the type\nthe array contains.</p>\n<p>Using <code>address: HeroAddress</code> the property type is known to the library.<br>Using <code>address: HeroAddress[]</code> the property type is <strong>not</strong> known and\nthe library will use <code>Object</code> as the type. This is a TS limitation.</p>\n<p>In most cases, dynamic forms can work without it but in some scenarios\nit is required.</p>\n<p>Working with <code>childForm: true</code> requires information about the type of\nthe child form which requires the type.</p>\n<p>To provide that we use <code>type: () =&gt; HeroAddress</code> which is a function\nthat return the type.</p>\n<p>Note that <code>type</code> is set outside of <code>form</code>, it belongs to <code>@Prop</code> and\ncomes from <code>@angular/core</code>, if you are using <code>@FormProp</code> as the\ndecorator you can set the type in the special <code>rtType</code> property</p>\n<pre class="lang-ts"><code class="lang-ts">  <span class="hljs-meta">@FormProp</span>({    \n    required: <span class="hljs-literal">true</span>,\n    rtType: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> HeroAddress,\n    render: {\n      vType: <span class="hljs-string">\'form\'</span>,\n      label: <span class="hljs-string">\'Address\'</span>\n    },\n    childForm: <span class="hljs-literal">true</span>\n  })\n  address: HeroAddress[];\n</code></pre>\n<div class="alert">\nUsing <code>type</code> solves other issues similar to those solved by <code>forwardRef</code>\nfrom <code>@angular/core</code>.\n</div>'},{file:"arrays.component.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { RendererEvent, ChildFormEditRendererEvent, TDMModelForm } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n<span class="hljs-keyword">import</span> { matTabsAnimations, MatTabBodyPositionState } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/material/tabs\'</span>;\n\n<span class="hljs-keyword">import</span> { Hero, HeroAddress } <span class="hljs-keyword">from</span> <span class="hljs-string">\'./model\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-arrays\'</span>,\n  templateUrl: <span class="hljs-string">\'./arrays.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./arrays.component.scss\'</span> ],\n  animations: [ matTabsAnimations.translateTab ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ArraysComponent {\n  model: Hero;\n\n  external = {\n    posMaster: <span class="hljs-string">\'center\'</span> <span class="hljs-keyword">as</span> MatTabBodyPositionState,\n    forms: [] <span class="hljs-keyword">as</span> <span class="hljs-built_in">Array</span>&lt;{\n      event: ChildFormEditRendererEvent,\n      form: TDMModelForm&lt;<span class="hljs-built_in">any</span>&gt;,\n      pos: MatTabBodyPositionState,\n    }&gt;,\n    current: <span class="hljs-number">-1</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">number</span>\n  };\n\n  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {\n    <span class="hljs-keyword">this</span>.model = <span class="hljs-keyword">new</span> Hero();\n    <span class="hljs-keyword">this</span>.model.allies = [ <span class="hljs-string">\'Thor\'</span>, <span class="hljs-string">\'Captain America\'</span> ];\n    <span class="hljs-keyword">this</span>.model.address = [\n      <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">new</span> HeroAddress(), {\n        street: <span class="hljs-string">\'Bat Cave Lane\'</span>,\n        city: <span class="hljs-string">\'Gotham\'</span>,\n        zip: <span class="hljs-string">\'9999\'</span>\n      }),\n      <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">new</span> HeroAddress(), {\n        street: <span class="hljs-string">\'Island Ave`\'</span>,\n        city: <span class="hljs-string">\'Themyscira\'</span>\n      })\n    ];\n  }\n\n  onRendererEvent(event: RendererEvent): <span class="hljs-built_in">void</span> {\n    <span class="hljs-keyword">switch</span> ( event.type ) {\n      <span class="hljs-keyword">case</span> <span class="hljs-string">\'childFormEdit\'</span>:\n        <span class="hljs-keyword">this</span>.addForm(&lt;<span class="hljs-built_in">any</span>&gt; event);\n        <span class="hljs-keyword">break</span>;\n      <span class="hljs-keyword">default</span>:\n        <span class="hljs-keyword">break</span>;\n    }\n  }\n\n  cancelForm(tdmForm: TDMModelForm&lt;<span class="hljs-built_in">any</span>&gt;): <span class="hljs-built_in">void</span> {\n    tdmForm.reset();\n  }\n\n  closeExternalForm(updated: <span class="hljs-built_in">boolean</span>): <span class="hljs-built_in">void</span> {\n    <span class="hljs-keyword">const</span> ext = <span class="hljs-keyword">this</span>.external.forms.pop();\n    <span class="hljs-keyword">this</span>.external.current--;\n    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.external.current === <span class="hljs-number">-1</span> ) {\n      <span class="hljs-keyword">this</span>.external.posMaster = <span class="hljs-string">\'center\'</span>;\n    } <span class="hljs-keyword">else</span> {\n      <span class="hljs-keyword">this</span>.external.forms[ <span class="hljs-keyword">this</span>.external.current ].pos = <span class="hljs-string">\'center\'</span>;\n    }\n    <span class="hljs-keyword">if</span> ( !updated ) {\n      ext.event.reset();\n    }\n    ext.event.context.item.markAsChanged();\n  }\n\n  <span class="hljs-keyword">private</span> addForm(event: ChildFormEditRendererEvent): <span class="hljs-built_in">void</span> {\n    <span class="hljs-keyword">const</span> external = {\n      event,\n      form: event.createTDMModelForm(),\n      pos: <span class="hljs-string">\'center\'</span> <span class="hljs-keyword">as</span> <span class="hljs-string">\'center\'</span>\n    };\n\n    <span class="hljs-keyword">this</span>.external.forms.push(external);\n    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.external.current === <span class="hljs-number">-1</span> ) {\n      <span class="hljs-keyword">this</span>.external.posMaster = <span class="hljs-string">\'left\'</span>;\n    } <span class="hljs-keyword">else</span> {\n      <span class="hljs-keyword">this</span>.external.forms[ <span class="hljs-keyword">this</span>.external.current ].pos = <span class="hljs-string">\'left\'</span>;\n    }\n    <span class="hljs-keyword">this</span>.external.current++;\n  }\n\n}\n',title:"Component"},{file:"arrays.component.html",lang:"html",section:"tdmDemo",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-container-wrapper"</span> <span class="hljs-attr">ngProjectAs</span>=<span class="hljs-string">"dynamic-form"</span>&gt;</span>\n\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-container"</span> [@<span class="hljs-attr">translateTab</span>]=<span class="hljs-string">"external.posMaster"</span> [<span class="hljs-attr">class.active</span>]=<span class="hljs-string">"external.posMaster === \'center\'"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> #<span class="hljs-attr">dynForm</span>\n                    [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span>\n                    (<span class="hljs-attr">rendererEvent</span>)=<span class="hljs-string">"onRendererEvent($event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">mat-raised-button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"primary"</span>\n              [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">"dynForm.form.status !== \'VALID\' || !dynForm.form.dirty"</span>\n              (<span class="hljs-attr">click</span>)=<span class="hljs-string">"dynForm.tdmForm.commitToModel(true)"</span>&gt;</span>SAVE<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">mat-button</span> [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">"dynForm.form.pristine"</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"cancelForm(dynForm.tdmForm)"</span>&gt;</span>CANCEL<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let f of external.forms; index as i"</span>\n         [@<span class="hljs-attr">translateTab</span>]=<span class="hljs-string">"external.forms[i].pos"</span>\n         [<span class="hljs-attr">class.active</span>]=<span class="hljs-string">"external.forms[i].pos === \'center\'"</span>\n         <span class="hljs-attr">class</span>=<span class="hljs-string">"form-container"</span> &gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> #<span class="hljs-attr">d</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"f.form"</span> (<span class="hljs-attr">rendererEvent</span>)=<span class="hljs-string">"onRendererEvent($event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">mat-raised-button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"primary"</span>\n              [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">"d.form.status !== \'VALID\' || !d.form.dirty"</span>\n              (<span class="hljs-attr">click</span>)=<span class="hljs-string">"closeExternalForm(true)"</span>&gt;</span>UPDATE<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">mat-button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"closeExternalForm(false)"</span>&gt;</span>BACK<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>',title:"Template"},{file:"arrays.component.scss",lang:"scss",section:"default",code:'<span class="hljs-selector-class">.form-container-wrapper</span> {\n  <span class="hljs-attribute">position</span>: relative;;\n  <span class="hljs-attribute">overflow</span>: hidden;\n  <span class="hljs-attribute">transition</span>: height .<span class="hljs-number">5s</span> cubic-bezier(.<span class="hljs-number">35</span>,<span class="hljs-number">0</span>,.<span class="hljs-number">25</span>,<span class="hljs-number">1</span>);\n}\n\n<span class="hljs-selector-class">.form-container</span> {\n  <span class="hljs-attribute">position</span>: absolute;\n  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;\n  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;\n  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;\n  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;\n  <span class="hljs-attribute">overflow</span>: hidden;\n  <span class="hljs-attribute">display</span>: block;\n\n  &amp;<span class="hljs-selector-class">.active</span> {\n    <span class="hljs-attribute">position</span>: relative;\n    <span class="hljs-attribute">overflow-x</span>: hidden;\n    <span class="hljs-attribute">overflow-y</span>: auto;\n    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;\n  }\n}\n',title:"Style"},{file:"model.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n<span class="hljs-keyword">import</span> { HeroAddress } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../15-flattening\'</span>;\n<span class="hljs-keyword">export</span> { HeroAddress } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../15-flattening\'</span>;\n\n<span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'number\'</span>,\n        label: <span class="hljs-string">\'Hero ID\'</span>\n      }\n    }\n  })\n  id: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Hero Name\'</span>\n      }\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'boolean\'</span>,\n        label: <span class="hljs-string">\'Has Tracking Device\'</span>\n      }\n    }\n  })\n  hasTracking: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slideToggle\'</span>,\n        label: <span class="hljs-string">\'Double Agent\'</span>\n      }\n    }\n  })\n  doubleAgent: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slider\'</span>,\n        label: <span class="hljs-string">\'BMI Index\'</span>,\n        data: { min: <span class="hljs-number">1</span>, max: <span class="hljs-number">35</span> }\n      }\n    }\n  })\n  bmi: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'select\'</span>,\n        label: <span class="hljs-string">\'Super Power\'</span>,\n        data: {\n          options: [\n              { value: <span class="hljs-string">\'selfHealing\'</span>, label: <span class="hljs-string">\'Self Healing\'</span> },\n              { value: <span class="hljs-string">\'flying\'</span>, label: <span class="hljs-string">\'Flying\'</span> },\n              { value: <span class="hljs-string">\'cloaking\'</span>, label: <span class="hljs-string">\'Cloaking\'</span> },\n              { value: <span class="hljs-string">\'cloning\'</span>, label: <span class="hljs-string">\'Cloaning\'</span> },\n              { value: <span class="hljs-string">\'invisibility\'</span>, label: <span class="hljs-string">\'Invisibility\'</span> }\n          ]\n        }\n      }\n    }\n  })\n  superPower: <span class="hljs-string">\'selfHealing\'</span> | <span class="hljs-string">\'flying\'</span> | <span class="hljs-string">\'cloaking\'</span> | <span class="hljs-string">\'cloning\'</span> | <span class="hljs-string">\'invisibility\'</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      flatten: {\n        name: {\n          required: <span class="hljs-literal">true</span>,\n          render: {\n            vType: <span class="hljs-string">\'text\'</span>,\n            label: <span class="hljs-string">\'Base Name\'</span>,\n          }\n        },\n        coordinates: {\n          flatten: {\n            lng: {\n              render: {\n                vType: <span class="hljs-string">\'number\'</span>,\n                label: <span class="hljs-string">\'Base Longitude\'</span>\n              }\n            },\n            lat: {\n              render: {\n                vType: <span class="hljs-string">\'number\'</span>,\n                label: <span class="hljs-string">\'Base Latitude\'</span>\n              }\n            }\n          }\n        }\n      }\n    }\n  })\n  base: {\n    name: <span class="hljs-built_in">string</span>;\n    coordinates: {\n      lng: <span class="hljs-built_in">number</span>;\n      lat: <span class="hljs-built_in">number</span>;\n    }\n  };\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Allies\'</span>\n      }\n    }\n  })\n  allies: <span class="hljs-built_in">string</span>[];\n\n  <span class="hljs-meta">@Prop</span>({\n    <span class="hljs-keyword">type</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> HeroAddress,\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'form\'</span>,\n        label: <span class="hljs-string">\'Address\'</span>,\n        identity: <span class="hljs-string">\'street\'</span>\n      },\n      childForm: <span class="hljs-literal">true</span>\n    }\n  })\n  address: HeroAddress[];\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'form\'</span>,\n        label: <span class="hljs-string">\'Brother\'</span>\n      },\n      childForm: <span class="hljs-literal">true</span>\n    }\n  })\n  brother: Hero;\n}\n',title:"Model"}]}});
//# sourceMappingURL=ArraysComponent.115b46641b6250416104.chunk.js.map