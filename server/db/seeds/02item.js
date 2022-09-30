/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('item').del();
  await knex('item').insert([
    {
      item_name: 'neque.',
      description:
        'consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec',
      quantity: 146,
      user_id: 1,
    },
    {
      item_name: 'molestie',
      description:
        'Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non',
      quantity: 3,
      user_id: 2,
    },
    {
      item_name: 'mattis',
      description:
        'quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a',
      quantity: 10,
      user_id: 4,
    },
    {
      item_name: 'egestas.',
      description:
        'lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc',
      quantity: 311,
      user_id: 3,
    },
    {
      item_name: 'Suspendisse',
      description:
        'enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus',
      quantity: 284,
      user_id: 4,
    },
    {
      item_name: 'pharetra.',
      description:
        'vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam,',
      quantity: 196,
      user_id: 4,
    },
    {
      item_name: 'velit',
      description:
        'feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio.',
      quantity: 154,
      user_id: 4,
    },
    {
      item_name: 'Etiam',
      description:
        'fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien. Aenean massa. Integer vitae',
      quantity: 3,
      user_id: 5,
    },
    {
      item_name: 'magna.',
      description:
        'dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus',
      quantity: 20,
      user_id: 1,
    },
    {
      item_name: 'et',
      description:
        'nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi',
      quantity: 4,
      user_id: 4,
    },
    {
      item_name: 'mattis',
      description:
        'neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in',
      quantity: 380,
      user_id: 2,
    },
    {
      item_name: 'massa',
      description:
        'risus. In mi pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod',
      quantity: 220,
      user_id: 1,
    },
    {
      item_name: 'a',
      description:
        'lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue',
      quantity: 368,
      user_id: 2,
    },
    {
      item_name: 'eu',
      description:
        'quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl.',
      quantity: 135,
      user_id: 5,
    },
    {
      item_name: 'sit',
      description:
        'enim. Mauris quis turpis vitae purus gravida sagittis. Duis gravida. Praesent eu nulla at sem molestie sodales. Mauris blandit enim consequat purus. Maecenas libero est, congue a, aliquet',
      quantity: 87,
      user_id: 2,
    },
    {
      item_name: 'torquent',
      description:
        'rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus',
      quantity: 402,
      user_id: 4,
    },
    {
      item_name: 'sed',
      description:
        'Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam',
      quantity: 10,
      user_id: 1,
    },
    {
      item_name: 'lacus.',
      description:
        'Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque',
      quantity: 412,
      user_id: 3,
    },
  ]);
};
