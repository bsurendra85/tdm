webpackJsonp([29],{YBoq:function(s,n){s.exports=[{file:"README.md",lang:"md",section:"default",code:'<p>By default, the model instance and the form are different entities, the\nmodel is not bound to the form in any way.</p>\n<p>This is usually the preferred setup <sup>More on that in the next chpater</sup></p>\n<p>If you wish to bind the form and the model together you can do that\nusing the <code>hotBind</code> attribute.</p>\n<pre class="lang-html"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span> <span class="hljs-attr">hotBind</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>\n</code></pre>\n<p>Hot bind is an <code>@Input</code> so you can toggle it on and off.</p>\n<h4><a id="important-notes-about-strong-hotbind-strong-" class="anchor" href="#important-notes-about-strong-hotbind-strong-"><span class="header-link"></span></a>Important notes about <strong>hotBind</strong></h4><ul>\n<li><p><strong>Binding is not syncing</strong><br>When hot bind is switched <strong>on</strong> it does not sync previous changes. If\nyou switch it off, update the form, then switch it on the model will\nnot reflect the changes.</p>\n</li>\n<li><p><strong>Binding is <em>one-way</em></strong><br>Hot binding is <strong>one-way</strong>, from the FORM to the MODEL. Updates to the\nmodel will not reflect in the form.</p>\n</li>\n<li><p><strong>Binding does not care about validity</strong><br>The binding does not check for validity of the control, when the form\nupdates the model updates. </p>\n</li>\n</ul>\n'},{file:"hot-bind.component.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { Hero } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../4-element-metadata\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-hot-bind\'</span>,\n  templateUrl: <span class="hljs-string">\'./hot-bind.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./hot-bind.component.scss\'</span> ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HotBindComponent {\n  hotBind: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">true</span>;\n  model = <span class="hljs-keyword">new</span> Hero();\n}\n',title:"Component"},{file:"hot-bind.component.html",lang:"html",section:"tdmDemo",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"custom-form-actions"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-slide-toggle</span> [<span class="hljs-attr">checked</span>]=<span class="hljs-string">"hotBind"</span>\n                      (<span class="hljs-attr">change</span>)=<span class="hljs-string">"hotBind = !!$event.checked"</span>&gt;</span>Hot Bind<span class="hljs-tag">&lt;/<span class="hljs-name">mat-slide-toggle</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span> [<span class="hljs-attr">hotBind</span>]=<span class="hljs-string">"hotBind"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>',title:"Template"},{file:"hot-bind.component.scss",lang:"scss",section:"default",code:"",title:"Style"},{file:"model.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'number\'</span>,\n        label: <span class="hljs-string">\'Hero ID\'</span>\n      }\n    }\n  })\n  id: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Hero Name\'</span>\n      }\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'date\'</span>,\n        label: <span class="hljs-string">\'Hero Birth\'</span>\n      }\n    }\n  })\n  birth: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'boolean\'</span>,\n        label: <span class="hljs-string">\'Has Tracking Device\'</span>\n      }\n    }\n  })\n  hasTracking: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slideToggle\'</span>,\n        label: <span class="hljs-string">\'Double Agent\'</span>\n      }\n    }\n  })\n  doubleAgent: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slider\'</span>,\n        label: <span class="hljs-string">\'BMI Index\'</span>,\n        data: { min: <span class="hljs-number">1</span>, max: <span class="hljs-number">35</span> }\n      }\n    }\n  })\n  bmi: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'select\'</span>,\n        label: <span class="hljs-string">\'Super Power\'</span>,\n        data: {\n          options: [\n            { value: <span class="hljs-string">\'selfHealing\'</span>, label: <span class="hljs-string">\'Self Healing\'</span> },\n            { value: <span class="hljs-string">\'flying\'</span>, label: <span class="hljs-string">\'Flying\'</span> },\n            { value: <span class="hljs-string">\'cloaking\'</span>, label: <span class="hljs-string">\'Cloaking\'</span> },\n            { value: <span class="hljs-string">\'cloning\'</span>, label: <span class="hljs-string">\'Cloning\'</span> },\n            { value: <span class="hljs-string">\'invisibility\'</span>, label: <span class="hljs-string">\'Invisibility\'</span> }\n          ]\n        }\n      }\n    }\n  })\n  superPower: <span class="hljs-string">\'selfHealing\'</span> | <span class="hljs-string">\'flying\'</span> | <span class="hljs-string">\'cloaking\'</span> | <span class="hljs-string">\'cloning\'</span> | <span class="hljs-string">\'invisibility\'</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'textarea\'</span>,\n        label: <span class="hljs-string">\'Bio\'</span>,\n        data: {\n          autoSize: <span class="hljs-literal">false</span>,\n          minRows: <span class="hljs-number">3</span>,\n          maxRows: <span class="hljs-number">5</span>\n        }\n      }\n    }\n  })\n  bio: <span class="hljs-built_in">string</span>;\n}\n',title:"Model"}]}});
//# sourceMappingURL=HotBindComponent.ed11a3b447f612cf4767.chunk.js.map