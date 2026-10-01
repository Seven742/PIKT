import axios from 'axios'

// API routes live in the same Next.js app, so a relative URL is enough.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

const api = axios.create({ baseURL: BASE_URL, timeout: 10000 })

// Auto-attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pikt_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-logout if token expired
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const msg = error.response?.data?.message || ''
      if (msg.includes('Token') || msg.includes('token')) {
        localStorage.removeItem('pikt_token')
        localStorage.removeItem('pikt_admin')
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login:          (data) => api.post('/auth/login', data),
  getMe:          ()     => api.get('/auth/me'),
  changePassword: (data) => api.patch('/auth/change-password', data),
}

export const teacherAPI = {
  getAll:  ()             => api.get('/teachers'),
  getById: (id)           => api.get(`/teachers/${id}`),
  create:  (fd)           => api.post('/teachers', fd),
  update:  (id, fd)       => api.patch(`/teachers/${id}`, fd),
  delete:  (id)           => api.delete(`/teachers/${id}`),
}

export const newsAPI = {
  getAll:  (params)       => api.get('/news', { params }),
  getById: (id)           => api.get(`/news/${id}`),
  create:  (fd)           => api.post('/news', fd),
  update:  (id, fd)       => api.patch(`/news/${id}`, fd),
  delete:  (id)           => api.delete(`/news/${id}`),
}

export const courseAPI = {
  getAll:  (params)       => api.get('/courses', { params }),
  getById: (id)           => api.get(`/courses/${id}`),
  create:  (fd)           => api.post('/courses', fd),
  update:  (id, fd)       => api.patch(`/courses/${id}`, fd),
  delete:  (id)           => api.delete(`/courses/${id}`),
}

export const coopAPI = {
  getAll:  ()             => api.get('/cooperations'),
  getById: (id)           => api.get(`/cooperations/${id}`),
  create:  (fd)           => api.post('/cooperations', fd),
  update:  (id, fd)       => api.patch(`/cooperations/${id}`, fd),
  delete:  (id)           => api.delete(`/cooperations/${id}`),
}

export default api
