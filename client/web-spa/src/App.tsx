import {
  Button,
  ConfigProvider,
  DatePicker,
  Radio,
  Upload,
  message,
} from 'antd'
import type { UploadProps, RadioChangeEvent } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import frFR from 'antd/lib/locale/fr_FR'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/fr'
import 'dayjs/locale/zh-cn'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UploadOutlined } from '@ant-design/icons'

function App() {
  const { t, i18n } = useTranslation()
  const [antdLocale, setAntdLocale] = useState(enUS)

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      // 同步 antd 语言
      switch (lng) {
        case 'fr':
          setAntdLocale(frFR)
          dayjs.locale(lng)
          break
        case 'en':
          setAntdLocale(enUS)
          dayjs.locale(lng)
          break
        case 'cn':
        default:
          setAntdLocale(zhCN)
          dayjs.locale('zh-cn')
          break
      }
    }

    // 初始化时设置语言
    handleLanguageChange(i18n.language)

    // 监听语言变化
    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  const changeLocale = useCallback((e: RadioChangeEvent) => {
    i18n.changeLanguage(e.target.value)
  }, [])

  const props: UploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <ConfigProvider locale={antdLocale}>
      <h1>{t('demo.Welcome to React')}</h1>

      <DatePicker />

      <DatePicker />

      <Radio.Group value={i18n.language} onChange={changeLocale}>
        <Radio.Button key="en" value={'en'}>
          English
        </Radio.Button>
        <Radio.Button key="cn" value={'cn'}>
          中文
        </Radio.Button>
      </Radio.Group>

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </ConfigProvider>
  )
}

export default App
