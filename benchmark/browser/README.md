# Browser benchmark

This project is used when running the following command:

```sh
yarn benchmark:browser
```

It is suppose to give developers comparable values between running different scenarios inside the browser, that can be find the `./scenarios` folder.

You should use these numbers exclusively for comparing performance between different scenarios, not as absolute values. There is also a `./noop` scenario, that renders nothing, to give you the idea of the initial setup time before the actual code is being run.

## Output

```
yarn benchmark:browser

noop (baseline):

20.10ms
20.05ms
19.28ms
19.64ms
20.96ms
18.80ms
18.39ms
20.38ms
18.85ms
18.99ms
-------------
Avg: 19.55ms
Median: 19.46ms

styled-components Box + @material-ui/system:

184.17ms
161.51ms
168.84ms
165.21ms
163.43ms
158.10ms
158.81ms
297.91ms
161.25ms
158.87ms
-------------
Avg: 177.81ms
Median: 162.47ms

styled-components Box + styled-system:

142.66ms
146.55ms
141.12ms
141.04ms
139.45ms
145.63ms
141.36ms
134.98ms
123.98ms
146.09ms
-------------
Avg: 140.29ms
Median: 141.24ms

Box emotion:

143.21ms
135.28ms
122.53ms
124.80ms
143.69ms
147.81ms
138.16ms
124.55ms
140.32ms
157.74ms
-------------
Avg: 137.81ms
Median: 139.24ms

Box @material-ui/styles:

146.16ms
131.37ms
139.43ms
158.55ms
149.54ms
131.81ms
134.84ms
151.08ms
152.30ms
130.69ms
-------------
Avg: 142.58ms
Median: 142.79ms

Box styled-components:

145.59ms
150.12ms
179.04ms
169.63ms
148.21ms
155.55ms
182.55ms
170.04ms
153.14ms
148.92ms
-------------
Avg: 160.28ms
Median: 154.35ms

Basic styled-components box:

141.73ms
139.71ms
121.01ms
120.02ms
121.81ms
143.22ms
135.67ms
120.85ms
121.08ms
120.59ms
-------------
Avg: 128.57ms
Median: 121.44ms

Chakra-UI box component:

147.42ms
128.51ms
118.74ms
110.01ms
133.05ms
130.20ms
121.57ms
119.11ms
108.57ms
134.90ms
-------------
Avg: 125.21ms
Median: 125.04ms

Theme-UI box sx prop:

165.02ms
141.07ms
139.19ms
185.45ms
166.16ms
138.83ms
140.56ms
139.02ms
179.26ms
165.58ms
-------------
Avg: 156.01ms
Median: 153.05ms

Theme-UI div sx prop:

131.07ms
130.84ms
130.99ms
132.66ms
132.24ms
130.89ms
131.11ms
167.10ms
154.42ms
131.48ms
-------------
Avg: 137.28ms
Median: 131.30ms
Done in 31.83s.
```
