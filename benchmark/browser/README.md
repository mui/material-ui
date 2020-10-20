# Browser benchmark

This project is used when running the following command:

```sh
yarn benchmark:browser
```

It is suppose to give developers comparable values between running different scenarios inside the browser, that can be find the `./scenarios` folder.

You should use these numbers exclusively for comparing performance between different scenarios, not as absolute values. There is also a `./noop` scenario, that renders nothing, to give you the idea of the initial setup time before the actual code is being run.

## Results

```
yarn benchmark:browser

noop (baseline):

4.32ms
4.26ms
6.18ms
4.17ms
4.00ms
4.15ms
3.83ms
3.84ms
3.86ms
3.90ms
-------------
Avg: 4.25ms
Median: 4.07ms

styled-components Box + @material-ui/system:

161.68ms
161.10ms
164.99ms
172.28ms
164.73ms
160.93ms
165.72ms
158.97ms
160.60ms
163.72ms
-------------
Avg: 163.47ms
Median: 162.70ms

styled-components Box + styled-system:

144.14ms
141.62ms
142.00ms
134.81ms
147.93ms
144.84ms
143.01ms
143.91ms
146.84ms
147.96ms
-------------
Avg: 143.71ms
Median: 144.02ms

Box emotion:

173.31ms
168.19ms
175.82ms
178.98ms
172.33ms
148.63ms
181.64ms
182.94ms
172.77ms
153.54ms
-------------
Avg: 170.82ms
Median: 173.04ms

Box @material-ui/styles:

202.45ms
188.87ms
171.55ms
171.95ms
195.44ms
187.87ms
171.53ms
193.70ms
201.01ms
170.26ms
-------------
Avg: 185.46ms
Median: 188.37ms

Box styled-components:

172.00ms
193.89ms
187.75ms
168.34ms
163.00ms
192.08ms
187.17ms
163.28ms
168.21ms
192.83ms
-------------
Avg: 178.85ms
Median: 179.58ms

Basic styled-components box:

140.86ms
119.85ms
122.55ms
145.65ms
141.74ms
117.54ms
121.83ms
117.58ms
145.90ms
140.92ms
-------------
Avg: 131.44ms
Median: 131.70ms

Chakra-UI box component:

123.20ms
122.41ms
144.09ms
135.43ms
115.99ms
123.37ms
114.71ms
138.75ms
133.79ms
123.71ms
-------------
Avg: 127.54ms
Median: 123.54ms

Theme-UI box sx prop:

147.55ms
175.65ms
174.38ms
147.36ms
148.91ms
179.23ms
172.43ms
147.87ms
150.14ms
149.70ms
-------------
Avg: 159.32ms
Median: 149.92ms

Theme-UI div sx prop:

138.23ms
136.78ms
138.53ms
138.89ms
172.48ms
166.99ms
140.68ms
139.84ms
137.00ms
141.95ms
-------------
Avg: 145.14ms
Median: 139.37ms

Material-UI box sx prop:

163.42ms
164.45ms
164.62ms
195.22ms
185.98ms
163.27ms
165.08ms
163.87ms
163.95ms
163.93ms
-------------
Avg: 169.38ms
Median: 164.20ms
Done in 32.03s.

```
