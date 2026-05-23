<script>
  import mhcost from '$lib/data/MHCost.json';

  let {
    width = 640,
    height = 360,
    regions = ['Northeast', 'Midwest', 'South', 'West'],
    strokeWidth = 2,
    colors = ['#c43e00', '#1f77b4', '#2ca02c', '#9467bd'],
    title = 'Average Cost of Manufactured House by US Region from 2014 to 2025',
  } = $props();

  const padding = { top: 0, right: 20, bottom: 40, left: 100 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Prepare series: x = Year, y = value
  const years = mhcost.map((d) => d.Year);
  const series = regions.map((r) => ({
    id: r,
    values: mhcost.map((d) => ({ year: d.Year, value: d[r] })),
  }));

  // domain for x and y
  const xMin = Math.min(...years);
  const xMax = Math.max(...years);
  const yValues = series.flatMap((s) => s.values.map((v) => v.value)).filter((v) => typeof v === 'number');
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  // scale helpers
  const xScale = (year) => {
    if (xMax === xMin) return padding.left + innerWidth / 2;
    return (
      padding.left + ((year - xMin) / (xMax - xMin)) * innerWidth
    );
  };
  const yScale = (val) => {
    // higher values map to smaller y (SVG origin top-left)
    if (yMax === yMin) return padding.top + innerHeight / 2;
    return (
      padding.top + (1 - (val - yMin) / (yMax - yMin)) * innerHeight
    );
  };

  function linePath(values) {
    return values
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.year)} ${yScale(p.value)}`)
      .join(' ');
  }

  // Axis ticks
  const xTicks = years;
  const yTicks = (() => {
    const ticks = 5;
    const step = (yMax - yMin) / (ticks - 1);
    const arr = [];
    for (let i = 0; i < ticks; i++) arr.push(Math.round((yMin + step * i) / 100) * 100);
    return Array.from(new Set(arr)).sort((a,b)=>a-b);
  })();

  // Visibility state per region
  let visible = $state(Object.fromEntries(regions.map((r) => [r, true])));

  function toggleRegion(id) {
    visible[id] = !visible[id];
  }
</script>
<!-- title and region buttons (click to toggle visibility) -->
<div class="chart-card">
  {#if title}
    <h3 class="chart-title"><strong>{title}</strong></h3>
    <p class="chart-subheading">Click to limit visible regions.</p>
  {/if}
  <div class="legend-buttons">
  {#each series as s, i}
    <button
      type="button"
      class="region-button"
      style={`background:${colors[i % colors.length]};`}
      aria-pressed={visible[s.id]}
      on:click={() => toggleRegion(s.id)}
    >
      {s.id}
    </button>
  {/each}
</div>

<svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="MH Cost line chart">
  <!-- white background -->
  <rect x="0" y="0" width={width} height={height} fill="#ffffff" />
  <!-- grid lines and y ticks -->
  {#each yTicks as yt}
    <line
      x1={padding.left}
      x2={width - padding.right}
      y1={yScale(yt)}
      y2={yScale(yt)}
      stroke="#eee"
      stroke-width="1"
    />
    <text x={padding.left - 8} y={yScale(yt)} text-anchor="end" alignment-baseline="middle" font-size="11" fill="#333">{(yt/1000).toFixed(1)}</text>
  {/each}

  <!-- x axis ticks -->
  {#each xTicks as xt}
    <line x1={xScale(xt)} x2={xScale(xt)} y1={height - padding.bottom} y2={height - padding.bottom + 6} stroke="#333" />
    <text x={xScale(xt)} y={height - padding.bottom + 18} text-anchor="middle" font-size="11" fill="#333">{xt}</text>
  {/each}

  <!-- lines -->
  {#each series as s, i}
    <path
      d={linePath(s.values)}
      fill="none"
      stroke={colors[i % colors.length]}
      stroke-width={strokeWidth}
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-opacity={visible[s.id] ? 1 : 0}
    />
  {/each}

  <!-- axes -->
  <line x1={padding.left} x2={padding.left} y1={padding.top} y2={height - padding.bottom} stroke="#333" />
  <line x1={padding.left} x2={width - padding.right} y1={height - padding.bottom} y2={height - padding.bottom} stroke="#333" />

  <!-- axis labels -->
  <!-- X axis label (spaced below axis) -->
  <text x={(padding.left + (width - padding.right)) / 2} y={height - padding.bottom + 47.5} text-anchor="middle" font-size="12" fill="#333">Year</text>
  <!-- Y axis label (rotated and shifted left for spacing) -->
  <text x={padding.left - 100} y={(padding.top + (height - padding.bottom)) / 2} text-anchor="middle" font-size="12" fill="#333" transform={`rotate(-90 ${padding.left - 75} ${(padding.top + (height - padding.bottom)) / 2})`}>Price (in thousands)</text>

</svg>

</div>

<style>
  svg { font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }

  .legend-buttons {
    display: flex;
    gap: 8px;
    margin-top: -6px;
    margin-bottom: 4px;
  }
  .region-button {
    border: none;
    color: #fff;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
  }
  .region-button[aria-pressed="false"] {
    opacity: 0.45;
  }
  .chart-title {
    margin: -0.35rem 0 0 0;
    font-size: 22px;
    color: #111;
  }
  .chart-subheading {
    margin: 0 0 0 0;
    font-size: 16px;
    line-height: 1.1;
    color: #555;
  }
  .chart-card {
    background: #fff;
    border: 4px solid #000;
    box-sizing: border-box;
    padding: .0rem 14px 14px 14px;
    width: 100%;
  }
</style>
