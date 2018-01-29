webpackJsonp([9],{n0Y8:function(s,a){s.exports=[{file:"override.component.ts",code:'<span class="hljs-keyword">import</span> { Component, ViewChild, TemplateRef, AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { DynamicFormComponent, DynamicFormOverrideContext } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n<span class="hljs-keyword">import</span> { bySection } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@webpack-ext/tdm-code-sample/client\'</span>;\n<span class="hljs-keyword">import</span> { User } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../models\'</span>;\n\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-override\'</span>,\n  templateUrl: <span class="hljs-string">\'./override.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./override.component.scss\'</span> ]\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> OverrideComponent <span class="hljs-keyword">implements</span> AfterViewInit {\n  model = <span class="hljs-keyword">new</span> User();\n\n}\n',lang:"ts",section:"TDM-DEMO",title:"Component"},{file:"override.component.html",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> #<span class="hljs-attr">dynFormMaster</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>  *<span class="hljs-attr">dynamicFormOverride</span>=<span class="hljs-string">"\'email\'; let ctx"</span> <span class="hljs-attr">fxLayout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dyn-form-row"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dyn-form-element-container"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">sub</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: #b5b5b5"</span>&gt;</span>{{ctx.item.label}}<span class="hljs-tag">&lt;/<span class="hljs-name">sub</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: red; margin-top: 10px"</span>&gt;</span>CLASSIFIED<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>  *<span class="hljs-attr">dynamicFormOverride</span>=<span class="hljs-string">"\'address.city\'; let ctx"</span> <span class="hljs-attr">fxLayout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dyn-form-row"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dyn-form-element-container"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">sub</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: #b5b5b5"</span>&gt;</span>{{ctx.item.label}}<span class="hljs-tag">&lt;/<span class="hljs-name">sub</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: red; margin-top: 10px"</span>&gt;</span>CLASSIFIED<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>  *<span class="hljs-attr">dynamicFormOverride</span>=<span class="hljs-string">"\'*\'; let ctx"</span> <span class="hljs-attr">fxLayout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dyn-form-row"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dyn-form-element-container"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form-element</span> <span class="hljs-attr">showLabels</span>\n                              [<span class="hljs-attr">tdmForm</span>]=<span class="hljs-string">"ctx.tdmForm"</span>\n                              [<span class="hljs-attr">item</span>]=<span class="hljs-string">"ctx.item"</span>\n                              [<span class="hljs-attr">fArray</span>]=<span class="hljs-string">"ctx.fArray"</span>\n                              [<span class="hljs-attr">fGroup</span>]=<span class="hljs-string">"ctx.fGroup"</span>\n                              [<span class="hljs-attr">fControl</span>]=<span class="hljs-string">"ctx.fControl"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form-element</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>',lang:"html",section:"TDM-DEMO",title:"Template"},{file:"override.component.ts",code:'<span class="hljs-keyword">import</span> { Component, ViewChild, TemplateRef, AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n<span class="hljs-keyword">import</span> { DynamicFormComponent, DynamicFormOverrideContext } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n<span class="hljs-keyword">import</span> { bySection } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@webpack-ext/tdm-code-sample/client\'</span>;\n<span class="hljs-keyword">import</span> { User } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../models\'</span>;\n\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-override\'</span>,\n  templateUrl: <span class="hljs-string">\'./override.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./override.component.scss\'</span> ]\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> OverrideComponent <span class="hljs-keyword">implements</span> AfterViewInit {\n  model = <span class="hljs-keyword">new</span> User();\n\n  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">\'dynFormCustomOverride\'</span>) dynFormCustomOverride: DynamicFormComponent;\n  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">\'emailFieldOverrideTpl\'</span>, { read: TemplateRef })\n  emailFieldOverrideTpl: TemplateRef&lt;DynamicFormOverrideContext&gt;;\n  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">\'defaultFieldOverrideTpl\'</span>, { read: TemplateRef })\n  defaultFieldOverrideTpl: TemplateRef&lt;DynamicFormOverrideContext&gt;;\n\n  ngAfterViewInit(): <span class="hljs-built_in">void</span> {\n    <span class="hljs-keyword">this</span>.dynFormCustomOverride.addOverride(<span class="hljs-string">\'email\'</span>, <span class="hljs-keyword">this</span>.emailFieldOverrideTpl, <span class="hljs-literal">false</span>);\n    <span class="hljs-keyword">this</span>.dynFormCustomOverride.addOverride(<span class="hljs-string">\'*\'</span>, <span class="hljs-keyword">this</span>.defaultFieldOverrideTpl, <span class="hljs-literal">true</span>);\n  }\n}\n',lang:"ts",section:"TDM-DEMO2",title:"Component"},{file:"override.component.html",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> #<span class="hljs-attr">dynFormCustomOverride</span> [<span class="hljs-attr">slaveOf</span>]=<span class="hljs-string">"dynFormMaster"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">ng-template</span> #<span class="hljs-attr">emailFieldOverrideTpl</span> <span class="hljs-attr">let-ctx</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: yellowgreen; text-align: center;"</span>&gt;</span>{{ctx.item.name}} is Classified<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">ng-template</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">ng-template</span> #<span class="hljs-attr">defaultFieldOverrideTpl</span> <span class="hljs-attr">let-ctx</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form-row</span> <span class="hljs-attr">custom</span>\n                      [<span class="hljs-attr">dynForm</span>]=<span class="hljs-string">"dynFormCustomOverride"</span>\n                      [<span class="hljs-attr">tdmForm</span>]=<span class="hljs-string">"ctx.tdmForm"</span>\n                      [<span class="hljs-attr">item</span>]=<span class="hljs-string">"ctx.item"</span>\n                      [<span class="hljs-attr">fArray</span>]=<span class="hljs-string">"ctx.fArray"</span>\n                      [<span class="hljs-attr">fGroup</span>]=<span class="hljs-string">"ctx.fGroup"</span>\n                      [<span class="hljs-attr">fControl</span>]=<span class="hljs-string">"ctx.fControl"</span>&gt;</span>\n      {{ctx.tdmForm.getValue(ctx.item.getRuntimePath(ctx.fControl)) || \'Not Set\'}}\n    <span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form-row</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">ng-template</span>&gt;</span>',lang:"html",section:"TDM-DEMO2",title:"Template"},{file:"override.component.scss",code:"",lang:"scss",title:"Style"},{file:"user.ts",code:'<span class="hljs-keyword">import</span> { Model } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/core\'</span>;\n<span class="hljs-keyword">import</span> { FormModel, FormProp } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>()\n<span class="hljs-meta">@FormModel</span>()\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> User {\n  <span class="hljs-meta">@FormProp</span>({\n    required: <span class="hljs-literal">true</span>,\n    render: {\n      <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n      label: <span class="hljs-string">\'User Name\'</span>\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@FormProp</span>({\n    render: {\n      <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n      label: <span class="hljs-string">\'User Email Address\'</span>\n    }\n  })\n  email: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@FormProp</span>({\n    flatten: {\n      street: {\n        required: <span class="hljs-literal">true</span>,\n        render: {\n          <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n          label: <span class="hljs-string">\'Street\'</span>\n        }\n      },\n      city: {\n        required: <span class="hljs-literal">true</span>,\n        render: {\n          <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n          label: <span class="hljs-string">\'City\'</span>\n        }\n      },\n      zip: {\n        render: {\n          <span class="hljs-keyword">type</span>: <span class="hljs-string">\'number\'</span>,\n          label: <span class="hljs-string">\'ZIP\'</span>\n        }\n      },\n      state: {\n        defaultValue: <span class="hljs-string">\'CA\'</span>,\n        render: {\n          label: <span class="hljs-string">\'State\'</span>,\n          <span class="hljs-keyword">type</span>: <span class="hljs-string">\'select\'</span>,\n          data: {\n            selections: [\n              { value: <span class="hljs-string">\'CA\'</span>, label: <span class="hljs-string">\'California\'</span> },\n              { value: <span class="hljs-string">\'NY\'</span>, label: <span class="hljs-string">\'New York\'</span> },\n              { value: <span class="hljs-string">\'WA\'</span>, label: <span class="hljs-string">\'Washington\'</span> },\n              { value: <span class="hljs-string">\'NJ\'</span>, label: <span class="hljs-string">\'New Jersey\'</span> }\n            ]\n          }\n        }\n      }\n    }\n  })\n  address: {\n    street: <span class="hljs-built_in">string</span>;\n    city: <span class="hljs-built_in">string</span>;\n    zip: <span class="hljs-built_in">number</span>;\n    state: <span class="hljs-string">\'CA\'</span> | <span class="hljs-string">\'NY\'</span> | <span class="hljs-string">\'GA\'</span> | <span class="hljs-string">\'WY\'</span>;\n  };\n}\n',lang:"ts",title:"Model"}]}});
//# sourceMappingURL=OverrideComponent.c09ad71e038ee5219d03.chunk.js.map