(async () => {'use strict';
try {
  const manifest = await fetch('ngsw.json').then(res => res.json());
  const lazyUrls = manifest.assetGroups.find(g => g.name === 'docs-lazy').urls;
  const confirmed = confirm(`Download all ${lazyUrls.length} URLs?`);
  if (confirmed) {
    const start = performance.now();
    const responses = await Promise.all(lazyUrls.map(u => fetch(u)));
    const failedCount = responses.filter(r => !r.ok).length;
    const duration = Math.round((performance.now() - start) / 1000);
  }
} catch (err) {
  alert(`An error occurred:\n\n${err.stack}`);
}
})();
