// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /api/health */
export async function mainControllerHealth(options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/api/health', {
    method: 'GET',
    ...(options || {}),
  })
}
