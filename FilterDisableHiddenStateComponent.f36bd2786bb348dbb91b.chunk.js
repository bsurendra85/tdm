webpackJsonp([12],{"4IkC":function(s,a){s.exports=[{file:"README.md",lang:"md",section:"part1",code:'<h1><a id="filter-disabled-hidden" class="anchor" href="#filter-disabled-hidden"><span class="header-link"></span></a>Filter / Disabled / Hidden</h1><p>Filter, Disabled and Hidden are states of a control. They are toggle\nstates, i.e. on/off.</p>\n<p>The 3 states have nothing in common, they are grouped because they are\ntoggled using the same mechanism, an array of control paths.</p>\n<p>A state is toggled on when the path of the control is added to the\narray of state and toggled off when removed.</p>\n<ul>\n<li><strong>Filter</strong>: Controls in this list are filtered out</li>\n<li><strong>Hidden</strong>: Controls in this list are marked as hidden</li>\n<li><strong>Disabled</strong>: Controls in this list are marked as disabled.</li>\n</ul>\n<div class="info">\n<strong>Filter</strong> and <strong>Hidden</strong> are states unique to dynamic forms and does\nnot modify value or state in the form control.<br>\nThe <strong>Disabled</strong> state is an angular forms state. A change in the\ndisabled state will change the state of the form control\n</div>\n\n<p>The states are part of the <code>DynamicFormComponent</code> API, each state is\nexposed through an <code>@Input()</code> and tracked by the component.</p>\n<h2><a id="hidden-implementation" class="anchor" href="#hidden-implementation"><span class="header-link"></span></a>Hidden implementation</h2><p>The library treats the hidden state as purely logical, no UI\nimplementation is done by the library because there are many ways to\nhide an element.</p>\n<p>Renderer&#39;s are required to implement this feature on the UI side.</p>\n<p>Here is an example from the previous renderer</p>\n<pre class="lang-html"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngSwitch</span>]=<span class="hljs-string">"item.type"</span> [<span class="hljs-attr">style.display</span>]=<span class="hljs-string">"item.hidden ? \'none\' : undefined"</span>&gt;</span>\n  ...\n<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n</code></pre>\n<h2><a id="filter-and-code-filtermode-code-" class="anchor" href="#filter-and-code-filtermode-code-"><span class="header-link"></span></a>Filter and <code>filterMode</code></h2><p>By default, values in the <code>filter</code> array are excluded (filtered out),\ni.e. all fields are included except those in the <code>filter</code> array.</p>\n<p>This is good when we have specific fields we want to exclude.</p>\n<p>We can also invert the filter so values in the <code>filter</code> array are\nincluded (filtered in), i.e. all fields are excluded except those in the\n<code>filter</code> array.</p>\n<p>To invert the filter set the <code>filterMode</code> attribute to <code>include</code>.\nTo get back to the default mode set the <code>filterMode</code> attribute to \n<code>exclude</code>.</p>\n<p>In the following example:</p>\n<ul>\n<li><code>superPower</code> is <strong>filtered</strong></li>\n<li><code>hasTracking</code> is <strong>hidden</strong></li>\n<li><code>name</code> and <code>id</code> are <strong>disabled</strong></li>\n</ul>\n'},{file:"README.md",lang:"md",section:"part2",code:'<h3><a id="excluding-required-fields" class="anchor" href="#excluding-required-fields"><span class="header-link"></span></a>Excluding required fields</h3><p>In the following form the name field is excluded but it is also required\nso the form can never enter into a valid state. To work around that you\ncan disable the excluded field which causes the form to ignore it when\ncomputing validation.</p>\n<p>In the form below the <code>name</code> field has a <strong>required</strong> validation but\nit is also excluded, it can never get a value assigned by the form.</p>\n<p>Fill the <code>Hero ID</code> in the form below and watch the status LED turn red.<br>Disable the <code>name</code> field on the left panel and watch the status go green.  </p>\n'},{file:"filter-disable-hidden-state.component.ts",lang:"ts",section:"tdmDemo",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>\n<span class="hljs-keyword">import</span> { Hero } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../4-element-metadata\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-filter-disable-hidden-state\'</span>,\n  templateUrl: <span class="hljs-string">\'./filter-disable-hidden-state.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./filter-disable-hidden-state.component.scss\'</span> ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> FilterDisableHiddenStateComponent {\n\n  model = <span class="hljs-keyword">new</span> Hero();\n\n}\n',title:"Component"},{file:"filter-disable-hidden-state.component.html",lang:"html",section:"tdmDemo",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"custom-form-actions"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Filter Mode: <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-radio-group</span> #<span class="hljs-attr">filterMode</span>=<span class="hljs-string">"matRadioGroup"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"exclude"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-radio-button</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"exclude"</span>&gt;</span>Exclude<span class="hljs-tag">&lt;/<span class="hljs-name">mat-radio-button</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-radio-button</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"include"</span>&gt;</span>Include<span class="hljs-tag">&lt;/<span class="hljs-name">mat-radio-button</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">mat-radio-group</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n\n  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span>\n                [<span class="hljs-attr">filter</span>]=<span class="hljs-string">"[\'superPower\']"</span>\n                [<span class="hljs-attr">filterMode</span>]=<span class="hljs-string">"filterMode.selected.value"</span>\n                [<span class="hljs-attr">hiddenState</span>]=<span class="hljs-string">"[\'hasTracking\']"</span>\n                [<span class="hljs-attr">disabledState</span>]=<span class="hljs-string">"[\'name\', \'id\']"</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>',title:"Template"},{file:"filter-disable-hidden-state.component.ts",lang:"ts",section:"tdmDemoInteractive",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>\n<span class="hljs-keyword">import</span> { Hero } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../4-element-metadata\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-filter-disable-hidden-state\'</span>,\n  templateUrl: <span class="hljs-string">\'./filter-disable-hidden-state.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./filter-disable-hidden-state.component.scss\'</span> ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> FilterDisableHiddenStateComponent {\n\n  model = <span class="hljs-keyword">new</span> Hero();\n  controlState = { exclude: [], disabled: [], hidden: [] };  <span class="hljs-comment">// tslint:disable-line</span>\n\n  handleControlState(state: <span class="hljs-built_in">string</span>[], name: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {\n    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n      <span class="hljs-keyword">const</span> idx = state.indexOf(name);\n      <span class="hljs-keyword">if</span> (idx === <span class="hljs-number">-1</span>) {\n        state.push(name);\n      } <span class="hljs-keyword">else</span> {\n        state.splice(idx, <span class="hljs-number">1</span>);\n      }\n    });\n  }\n\n}\n',title:"Component"},{file:"filter-disable-hidden-state.component.html",lang:"html",section:"tdmDemoInteractive",code:'    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"filter-mode"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Filter Mode: <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-radio-group</span> #<span class="hljs-attr">filterModeInteractive</span>=<span class="hljs-string">"matRadioGroup"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"exclude"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">mat-radio-button</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"exclude"</span>&gt;</span>Exclude<span class="hljs-tag">&lt;/<span class="hljs-name">mat-radio-button</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">mat-radio-button</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"include"</span>&gt;</span>Include<span class="hljs-tag">&lt;/<span class="hljs-name">mat-radio-button</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">mat-radio-group</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">mat-list</span> <span class="hljs-attr">dense</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"max-width: 400px; min-height: 300px"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-list-item</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxLayout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%;"</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"40%"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>&gt;</span>{{filterModeInteractive.value === \'include\' ? \'Include\' : \'Exclude\'}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>&gt;</span>Disabled<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>&gt;</span>Hidden<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">mat-list-item</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-list-item</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let prop of [\'id\', \'name\', \'hasTracking\', \'doubleAgent\', \'bmi\', \'superPower\']"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxLayout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%;"</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"40%"</span>&gt;</span>{{prop}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">mat-checkbox</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>\n                        [<span class="hljs-attr">checked</span>]=<span class="hljs-string">"controlState.exclude.indexOf(prop) &gt; -1"</span>\n                        (<span class="hljs-attr">click</span>)=<span class="hljs-string">"handleControlState(controlState.exclude, prop)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mat-checkbox</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">mat-checkbox</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>\n                        [<span class="hljs-attr">checked</span>]=<span class="hljs-string">"controlState.disabled.indexOf(prop) &gt; -1"</span>\n                        (<span class="hljs-attr">click</span>)=<span class="hljs-string">"handleControlState(controlState.disabled, prop)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mat-checkbox</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">mat-checkbox</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>\n                        [<span class="hljs-attr">checked</span>]=<span class="hljs-string">"controlState.hidden.indexOf(prop) &gt; -1"</span>\n                        (<span class="hljs-attr">click</span>)=<span class="hljs-string">"handleControlState(controlState.hidden, prop)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mat-checkbox</span>&gt;</span>\n        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">mat-list-item</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">mat-list</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ngProjectAs</span>=<span class="hljs-string">"dynamic-form"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"min-height: 300px"</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span>\n                  [<span class="hljs-attr">filter</span>]=<span class="hljs-string">"controlState.exclude"</span>\n                  [<span class="hljs-attr">filterMode</span>]=<span class="hljs-string">"filterModeInteractive.selected.value"</span>\n                  [<span class="hljs-attr">disabledState</span>]=<span class="hljs-string">"controlState.disabled"</span>\n                  [<span class="hljs-attr">hiddenState</span>]=<span class="hljs-string">"controlState.hidden"</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>',title:"Template"},{file:"filter-disable-hidden-state.component.ts",lang:"ts",section:"tdmDemoExcludeRequired",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>\n<span class="hljs-keyword">import</span> { Hero } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../4-element-metadata\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-filter-disable-hidden-state\'</span>,\n  templateUrl: <span class="hljs-string">\'./filter-disable-hidden-state.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./filter-disable-hidden-state.component.scss\'</span> ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> FilterDisableHiddenStateComponent {\n\n  model = <span class="hljs-keyword">new</span> Hero();\n  modelExcludeDisabled = <span class="hljs-keyword">new</span> Hero(); \n  controlStateExcludeDisabled = { exclude: [<span class="hljs-string">\'name\'</span>], disabled: [], hidden: [] }; \n\n  handleControlState(state: <span class="hljs-built_in">string</span>[], name: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {\n    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n      <span class="hljs-keyword">const</span> idx = state.indexOf(name);\n      <span class="hljs-keyword">if</span> (idx === <span class="hljs-number">-1</span>) {\n        state.push(name);\n      } <span class="hljs-keyword">else</span> {\n        state.splice(idx, <span class="hljs-number">1</span>);\n      }\n    });\n  }\n\n}\n',title:"Component"},{file:"filter-disable-hidden-state.component.html",lang:"html",section:"tdmDemoExcludeRequired",code:'    <span class="hljs-tag">&lt;<span class="hljs-name">mat-list</span> <span class="hljs-attr">dense</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"max-width: 400px"</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-list-item</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxLayout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%;"</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"40%"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>&gt;</span>Exclude<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>&gt;</span>Disabled<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>&gt;</span>Hidden<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">mat-list-item</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">mat-list-item</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let prop of [\'name\']"</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxLayout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%;"</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"40%"</span>&gt;</span>{{prop}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">mat-checkbox</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>\n                        <span class="hljs-attr">disabled</span>\n                        [<span class="hljs-attr">checked</span>]=<span class="hljs-string">"controlStateExcludeDisabled.exclude.indexOf(prop) &gt; -1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mat-checkbox</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">mat-checkbox</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>\n                        [<span class="hljs-attr">checked</span>]=<span class="hljs-string">"controlStateExcludeDisabled.disabled.indexOf(prop) &gt; -1"</span>\n                        (<span class="hljs-attr">click</span>)=<span class="hljs-string">"handleControlState(controlStateExcludeDisabled.disabled, prop)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mat-checkbox</span>&gt;</span>\n          <span class="hljs-tag">&lt;<span class="hljs-name">mat-checkbox</span> <span class="hljs-attr">fxFlex</span>=<span class="hljs-string">"20%"</span>\n                        <span class="hljs-attr">disabled</span>\n                        [<span class="hljs-attr">checked</span>]=<span class="hljs-string">"controlStateExcludeDisabled.hidden.indexOf(prop) &gt; -1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mat-checkbox</span>&gt;</span>\n        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">mat-list-item</span>&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">mat-list</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"modelExcludeDisabled"</span>\n                [<span class="hljs-attr">filter</span>]=<span class="hljs-string">"controlStateExcludeDisabled.exclude"</span>\n                [<span class="hljs-attr">disabledState</span>]=<span class="hljs-string">"controlStateExcludeDisabled.disabled"</span>\n                [<span class="hljs-attr">hiddenState</span>]=<span class="hljs-string">"controlStateExcludeDisabled.hidden"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>',title:"Template"},{file:"filter-disable-hidden-state.component.scss",lang:"scss",section:"default",code:'<span class="hljs-selector-class">.form-wrapper-right-drawer</span> {\n  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;\n}\n<span class="hljs-selector-class">.filter-mode</span> {\n  <span class="hljs-attribute">margin</span>: <span class="hljs-number">15px</span>;\n}\n',title:"Style"},{file:"model.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'number\'</span>,\n        label: <span class="hljs-string">\'Hero ID\'</span>\n      }\n    }\n  })\n  id: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Hero Name\'</span>\n      }\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'date\'</span>,\n        label: <span class="hljs-string">\'Hero Birth\'</span>\n      }\n    }\n  })\n  birth: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'boolean\'</span>,\n        label: <span class="hljs-string">\'Has Tracking Device\'</span>\n      }\n    }\n  })\n  hasTracking: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slideToggle\'</span>,\n        label: <span class="hljs-string">\'Double Agent\'</span>\n      }\n    }\n  })\n  doubleAgent: <span class="hljs-built_in">boolean</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'slider\'</span>,\n        label: <span class="hljs-string">\'BMI Index\'</span>,\n        data: { min: <span class="hljs-number">1</span>, max: <span class="hljs-number">35</span> }\n      }\n    }\n  })\n  bmi: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        vType: <span class="hljs-string">\'select\'</span>,\n        label: <span class="hljs-string">\'Super Power\'</span>,\n        data: {\n          options: [\n            { value: <span class="hljs-string">\'selfHealing\'</span>, label: <span class="hljs-string">\'Self Healing\'</span> },\n            { value: <span class="hljs-string">\'flying\'</span>, label: <span class="hljs-string">\'Flying\'</span> },\n            { value: <span class="hljs-string">\'cloaking\'</span>, label: <span class="hljs-string">\'Cloaking\'</span> },\n            { value: <span class="hljs-string">\'cloning\'</span>, label: <span class="hljs-string">\'Cloning\'</span> },\n            { value: <span class="hljs-string">\'invisibility\'</span>, label: <span class="hljs-string">\'Invisibility\'</span> }\n          ]\n        }\n      }\n    }\n  })\n  superPower: <span class="hljs-string">\'selfHealing\'</span> | <span class="hljs-string">\'flying\'</span> | <span class="hljs-string">\'cloaking\'</span> | <span class="hljs-string">\'cloning\'</span> | <span class="hljs-string">\'invisibility\'</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      required: <span class="hljs-literal">true</span>,\n      render: {\n        vType: <span class="hljs-string">\'textarea\'</span>,\n        label: <span class="hljs-string">\'Bio\'</span>,\n        data: {\n          autoSize: <span class="hljs-literal">false</span>,\n          minRows: <span class="hljs-number">3</span>,\n          maxRows: <span class="hljs-number">5</span>\n        }\n      }\n    }\n  })\n  bio: <span class="hljs-built_in">string</span>;\n}\n',title:"Model"}]}});
//# sourceMappingURL=FilterDisableHiddenStateComponent.f36bd2786bb348dbb91b.chunk.js.map