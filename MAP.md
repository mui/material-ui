خطة شرح مكتبة Material-UI (MUI)
1. نظرة عامة على المكتبة
ما هي Material-UI؟
مكتبة React مفتوحة المصدر تطبق Material Design من Google
تحتوي على أكثر من 100 مكون جاهز للاستخدام
تستخدم نظام monorepo مع Lerna لإدارة الحزم المتعددة
الإصدار الحالي: 7.3.5
البنية الأساسية للمكتبة
الحزم الرئيسية (packages/):
@mui/material - المكونات الأساسية (Button, TextField, Dialog, etc.)
@mui/system - نظام CSS utilities للتصميم السريع
@mui/joy - مكتبة تجريبية بتصميم Joy (في حالة تجميد)
@mui/lab - مكونات تجريبية غير مستقرة
@mui/icons-material - أيقونات Material Design
@mui/utils - أدوات مساعدة
@mui/styled-engine - محرك التنسيق (Emotion/Styled Components)
2. هيكل المكونات
بنية مجلد المكون (مثال: Button)
Button/
├── Button.js          # المكون الرئيسي
├── Button.d.ts        # تعريفات TypeScript
├── Button.spec.tsx    # اختبارات
├── buttonClasses.ts   # فئات CSS utilities
└── index.js           # نقطة التصدير
كيفية عمل المكون:
useUtilityClasses - إنشاء فئات CSS ديناميكية
styled() - إنشاء مكونات مخصصة باستخدام zero-styled
Theme Integration - دمج مع نظام الثيم
Variants - دعم متغيرات مختلفة (contained, outlined, text)
Props System - نظام props مرن مع TypeScript
3. نظام الثيم (Theming)
الملفات الرئيسية:
createTheme.ts - إنشاء ثيم مخصص
ThemeProvider.tsx - موفر الثيم
createPalette.js - نظام الألوان
createTypography.js - نظام الخطوط
createTransitions.js - الانتقالات والحركات
الميزات:
دعم CSS Variables
Dark Mode
Responsive Design
Customization عميق
4. كيفية إضافة عنصر جديد
الخطوات:
إنشاء مجلد جديد في packages/mui-material/src/
إنشاء الملفات الأساسية:
ComponentName.js - المكون الرئيسي
ComponentName.d.ts - TypeScript types
componentNameClasses.ts - CSS classes
index.js - Export
إضافة التصدير في packages/mui-material/src/index.js
إنشاء الاختبارات في ComponentName.test.js
إضافة التوثيق في docs/
مثال على بنية مكون جديد:
// MyComponent.js
import { styled } from '../zero-styled';
import { useUtilityClasses } from './myComponentClasses';

const MyComponentRoot = styled('div', {
  name: 'MuiMyComponent',
  // ... styles
});

export default function MyComponent(props) {
  // ... implementation
}
5. كيفية استخدام المكتبة
التثبيت:
npm install @mui/material @emotion/react @emotion/styled
الاستخدام الأساسي:
import { Button, TextField, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained">Click me</Button>
    </ThemeProvider>
  );
}
الميزات المتقدمة:
Customization - تخصيص المكونات عبر sx prop
Theming - إنشاء ثيمات مخصصة
Composition - دمج المكونات
Accessibility - دعم كامل للوصولية
6. العيوب والقيود
العيوب:
حجم الحزمة الكبير - المكتبة كبيرة نسبياً
اعتماد على Emotion - يتطلب @emotion/react و @emotion/styled
منحنى التعلم - يحتاج وقت لفهم النظام بالكامل
التخصيص المعقد - التخصيص العميق قد يكون معقداً
Breaking Changes - تحديثات كبيرة بين الإصدارات
Joy UI متجمد - Joy UI في حالة تجميد ولا يُنصح باستخدامه
القيود:
يتطلب React 17+ أو 18+ أو 19+
يحتاج Node.js 14+ للبناء
بعض المكونات في @mui/lab غير مستقرة
Pigment CSS في مرحلة تجريبية
7. البنية التقنية
أدوات البناء:
pnpm - مدير الحزم
Lerna - إدارة Monorepo
TypeScript - للأنواع
Babel - للتحويل
Mocha - للاختبارات
نظام التصدير:
ES Modules
CommonJS
TypeScript declarations
8. التوثيق والمساهمة
التوثيق:
الموقع الرسمي: https://mui.com/material-ui/
الكود في docs/ directory
أمثلة في examples/ directory
المساهمة:
اتباع CONTRIBUTING.md
إنشاء PR على GitHub
اختبار التغييرات محلياً
تحديث التوثيق