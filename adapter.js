/**/ void function(factory) {
/**/   switch (true) {
/**/   case typeof module === 'object' && module && 'exports' in module: // CommonJS
/**/     module.exports = factory();
/**/     if (module.exports === void 0) module.exports = {};
/**/     break;
/**/   case typeof define === 'function' && !!define.amd: // AMD
/**/     define(factory);
/**/     break;
/**/   default: // Global
/**/     var global = new Function('return this')();
/**/     var name = '<!-- Name -->';
/**/     /**/ try { /* Fuck IE8- */
/**/     /**/   if (typeof execScript === 'object') execScript('var ' + name);
/**/     /**/ } catch(error) {}
/**/     global[name] = factory();
/**/   }
/**/ }(function() {

<!-- Code -->

return <!-- Name -->;

/**/ });
