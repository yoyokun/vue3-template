import { App } from 'vue';
import setupThrottleDriective from './throttle';

/** 自定义vue指令 */
export function setupDirectives(app: App) {
    setupThrottleDriective(app)
}