# Tensorflow常见报错解决
>2018年10月30日
## tf.train.SummaryWriter
```
AttributeError: 'module' object has no attribute 'SummaryWriter'
```
tf.train.SummaryWriter
改为：tf.summary.FileWriter
## tf.merge_all_summaries()
```
AttributeError: 'module' object has no attribute 'summaries'
```
tf.merge_all_summaries()
改为：summary_op = tf.summary.merge_all()
## tf.histogram_summary()
```
AttributeError: 'module' object has no attribute 'histogram_summary'
```
## tf.histogram_summary()
改为：tf.summary.histogram()
 
## tf.scalar_summary()
改为：tf.summary.scalar()
 
## tf.image_summary()
改为：tf.summary.image()
