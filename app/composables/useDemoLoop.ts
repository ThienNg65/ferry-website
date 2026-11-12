import { useIntersectionObserver, useIntervalFn, usePreferredReducedMotion } from '@vueuse/core'

// Shared timer for the coded demos. It ticks only while the demo is on screen, not paused and not under reduced motion.
// By default a tick advances `scene` (0 to count - 1); pass `tick` for demos that stream instead of cycling.
export function useDemoLoop(opts: { count?: number, ms?: number, tick?: () => void } = {}) {
  const { count = 1, ms = 6000, tick } = opts
  const scene = ref(0)
  const auto = ref(true)
  const frozen = ref(false)
  const visible = ref(false)
  const root = ref<HTMLElement>()
  const motion = usePreferredReducedMotion()
  const reduced = computed(() => motion.value === 'reduce')
  const running = computed(() => auto.value && !frozen.value)

  const { pause, resume } = useIntervalFn(tick ?? (() => { scene.value = (scene.value + 1) % count }), ms, { immediate: false })
  // `root` is usually a component ref, so observe its root element, and only once that is a real element.
  const el = computed(() => { const r = root.value as unknown as { $el?: unknown } | undefined; const e = r?.$el ?? r; return e instanceof HTMLElement ? e : null })
  useIntersectionObserver(el, ([e]) => { visible.value = e?.isIntersecting ?? false })
  // Client only: an interval started during SSR would keep the prerender process alive.
  onMounted(() => watchEffect(() => (running.value && visible.value && !reduced.value ? resume() : pause())))

  function pick(i: number) { scene.value = i; auto.value = false; frozen.value = false }
  function toggle() {
    if (running.value) { auto.value = false; frozen.value = true } else { auto.value = true; frozen.value = false }
  }
  return { scene, auto, frozen, visible, reduced, running, root, pick, toggle }
}
