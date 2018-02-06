webpackJsonp([25],{i8Xy:function(s,n){s.exports=[{file:"README.md",lang:"md",section:"default",code:'<h2><a id="nested-models-and-code-angular-forms-code-" class="anchor" href="#nested-models-and-code-angular-forms-code-"><span class="header-link"></span></a>Nested models and <code>@angular/forms</code></h2><p>In angular, a form is a container of form controls. We reviewed the 3\nbuilding blocks of angular forms: <code>FormGroup</code>, <code>FormArray</code> and\n<code>FormControl</code>.</p>\n<p>From the 3, <code>FormGroup</code> and <code>FormArray</code> are containers and they can\ncontains instances of all of the blocks <strong>but only</strong> <code>FormGroup</code> is the\ncontainer we use to describe a key/value structure, i.e. a model.</p>\n<p>When a <code>FormGroup</code> contains other <code>FormGroup</code> instances, <em>directly or\nindirectly</em>, they are referred to as <strong>nested models</strong> or\n<strong>nested forms</strong></p>\n<p>In angular, a <strong>form</strong> means the <code>FormGroup</code> instance that is the root\nof all other form controls, but it is still a <code>FormGroup</code>.</p>\n<div class="info">\n  <strong>Directly</strong>: The nested model is a value of a property on the parent\n  <br>\n  <strong>Indirectly</strong>: The nested model is an item in a <code>FormArray</code> instance\n  that is a value of a property on the parent\n</div>\n\n<h2><a id="nested-models-and-code-tdm-ngx-dynamic-forms-code-" class="anchor" href="#nested-models-and-code-tdm-ngx-dynamic-forms-code-"><span class="header-link"></span></a>Nested models and <code>@tdm/ngx-dynamic-forms</code></h2><p>The library&#39;s definition for a form is a bit more specific, a form can\nbe an instance of a known <strong>model</strong>.</p>\n<p>A known <strong>model</strong> is a class decorated with <code>@FormModel</code>. The class is\n&quot;known&quot; to the library.</p>\n<p>We&#39;ve already seen how we can create nested models using\n<strong>flattening declaration</strong>. These nested models are not <strong>known models</strong>,\nthey are data structures but the are not known to the library.</p>\n<p>A flattened declaration becomes a <code>FormGroup</code> hence, it is a valid\n<strong>nested model</strong>.</p>\n<h2><a id="child-forms" class="anchor" href="#child-forms"><span class="header-link"></span></a>Child forms</h2><p>To prevent confusion in terminology let&#39;s define a new term:\n<strong>child form</strong></p>\n<p>A child form is a <strong>known model</strong> that is, <em>directly or indirectly</em>\nreferenced by a property of a <strong>known model</strong> (parent) <strong>AND</strong> it is\nexplicitly declared as a child form.</p>\n<p>Let&#39;s see an example:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      childForm: <span class="hljs-literal">true</span>\n    }\n  })\n  nemesis: Hero;\n}\n</code></pre>\n<p>The <code>nemesis</code> property in the <code>Hero</code> class is a child form because it:</p>\n<ol>\n<li>Refer to a <strong>known model</strong>, the <code>Hero</code> model</li>\n<li>Explicitly declared as a child form via <code>childForm: true</code></li>\n</ol>\n<div class="info">\nNote that <code>childForm</code> is set on the metadata but not in the <code>render</code>\nobject, it is a logical definition not a visual definition.\n</div>\n\n<p>Let&#39;s review another example, this time a child form is <strong>not</strong> defined:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>()\n  badNemesis: Hero;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      flatten: {\n        id: {\n          render: {\n            vType: <span class="hljs-string">\'number\'</span>,\n            label: <span class="hljs-string">\'Nemesis ID\'</span>\n          }\n        }\n      }\n    }\n  })\n  notAChildNemesis: Hero;  \n}\n</code></pre>\n<p><code>badNemesis</code> is just a property, it&#39;s not being defined as a form\ncontrol.</p>\n<p><code>notAChildNemesis</code> is a form control and it is a <strong>known model</strong> but\nit is not explicitly defined as a <strong>childForm</strong>, instead we use a\n<strong>flattening declaration</strong> for it, it is a <strong>nested model</strong> but not a\nchild form.</p>\n<p>Like <strong>nested models</strong>, child forms can be referenced indirectly, which\nmakes the following a valid child form:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>({\n    <span class="hljs-keyword">type</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> Hero,\n    form: {\n      childForm: <span class="hljs-literal">true</span>\n    }\n  })\n  nemesis: Hero[];\n}\n</code></pre>\n'},{file:"child-form.component.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { ArrayActionRequestEvent } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n<span class="hljs-keyword">import</span> { Hero } <span class="hljs-keyword">from</span> <span class="hljs-string">\'./model\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-child-form\'</span>,\n  templateUrl: <span class="hljs-string">\'./child-form.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./child-form.component.scss\'</span> ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ChildFormComponent {\n  model = <span class="hljs-keyword">new</span> Hero();\n\n  onArrayActionRequest(event: ArrayActionRequestEvent): <span class="hljs-built_in">void</span> {\n    <span class="hljs-keyword">if</span> ( event.action === <span class="hljs-string">\'add\'</span> ) {\n      <span class="hljs-comment">// we need to create a form control instance, it can be FormControl but can also be FormGroup or FormArray</span>\n      <span class="hljs-comment">// we need to the serializer for that, so we use the helper function on [[TDMModelForm]]</span>\n      event.tdmForm.appendControl(event.fullName);\n      event.formArray.markAsDirty();\n    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( event.action === <span class="hljs-string">\'remove\'</span> ) {\n      event.formArray.removeAt(event.atIdx);\n      event.formArray.markAsDirty();\n    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( event.action === <span class="hljs-string">\'edit\'</span> ) {\n\n    }\n  }\n}\n',title:"Component"},{file:"child-form.component.html",lang:"html",section:"tdmDemo",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span>\n                [<span class="hljs-attr">filter</span>]=<span class="hljs-string">"[\'allies\']"</span>\n                (<span class="hljs-attr">arrayActionRequest</span>)=<span class="hljs-string">"onArrayActionRequest($event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>',title:"Template"},{file:"child-form.component.scss",lang:"scss",section:"default",code:"",title:"Style"},{file:"model.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> BaseCamp {\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Base Name\'</span>,\n      }\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      flatten: {\n        lng: {\n          render: {\n            vType: <span class="hljs-string">\'number\'</span>,\n            label: <span class="hljs-string">\'Base Longitude\'</span>\n          }\n        },\n        lat: {\n          render: {\n            vType: <span class="hljs-string">\'number\'</span>,\n            label: <span class="hljs-string">\'Base Latitude\'</span>\n          }\n        }\n      }\n    }\n  })\n  coordinates: {\n    lng: <span class="hljs-built_in">number</span>;\n    lat: <span class="hljs-built_in">number</span>;\n  };\n}\n\n<span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'number\'</span>,\n        label: <span class="hljs-string">\'Hero ID\'</span>\n      }\n    }\n  })\n  id: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Hero Name\'</span>\n      }\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'boolean\'</span>,\n        label: <span class="hljs-string">\'Has Tracking Device\'</span>\n      }\n    }\n  })\n  hasTracking: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slideToggle\'</span>,\n        label: <span class="hljs-string">\'Double Agent\'</span>\n      }\n    }\n  })\n  doubleAgent: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slider\'</span>,\n        label: <span class="hljs-string">\'BMI Index\'</span>,\n        data: { min: <span class="hljs-number">1</span>, max: <span class="hljs-number">35</span> }\n      }\n    }\n  })\n  bmi: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'select\'</span>,\n        label: <span class="hljs-string">\'Super Power\'</span>,\n        data: {\n          options: [\n              { value: <span class="hljs-string">\'selfHealing\'</span>, label: <span class="hljs-string">\'Self Healing\'</span> },\n              { value: <span class="hljs-string">\'flying\'</span>, label: <span class="hljs-string">\'Flying\'</span> },\n              { value: <span class="hljs-string">\'cloaking\'</span>, label: <span class="hljs-string">\'Cloaking\'</span> },\n              { value: <span class="hljs-string">\'cloning\'</span>, label: <span class="hljs-string">\'Cloaning\'</span> },\n              { value: <span class="hljs-string">\'invisibility\'</span>, label: <span class="hljs-string">\'Invisibility\'</span> }\n          ]\n        }\n      }\n    }\n  })\n  superPower: <span class="hljs-string">\'selfHealing\'</span> | <span class="hljs-string">\'flying\'</span> | <span class="hljs-string">\'cloaking\'</span> | <span class="hljs-string">\'cloning\'</span> | <span class="hljs-string">\'invisibility\'</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        identityKey: <span class="hljs-string">\'name\'</span>,\n        vType: <span class="hljs-string">\'form\'</span>,\n        label: <span class="hljs-string">\'Base Camp\'</span>\n      },\n      childForm: <span class="hljs-literal">true</span>\n    }\n  })\n  base: BaseCamp;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Allies\'</span>\n      }\n    }\n  })\n  allies: <span class="hljs-built_in">string</span>[];\n\n  <span class="hljs-meta">@Prop</span>({\n    <span class="hljs-keyword">type</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> BaseCamp,\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        identityKey: <span class="hljs-string">\'name\'</span>,\n        vType: <span class="hljs-string">\'form\'</span>,\n        label: <span class="hljs-string">\'Base Camp\'</span>\n      },\n      childForm: <span class="hljs-literal">true</span>\n    }\n  })\n  basesDestroyed: BaseCamp[];\n}\n',title:"Model"}]}});
//# sourceMappingURL=ChildFormComponent.aad4dab0bf627c371425.chunk.js.map