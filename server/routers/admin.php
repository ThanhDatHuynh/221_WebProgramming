<?php
  $router->post('/admin/create_dish', 'AdminController@createDish');
  $router->post('/admin/update_dish/{id}', 'AdminController@updateDish');
  $router->post('/admin/delete_dish/{id}', 'AdminController@deleteDish');

  $router->post('/admin/create_blog', 'AdminController@createBlog');
  $router->post('/admin/delete_blog/{id}', 'AdminController@deleteBlog');
  $router->post('/admin/update_blog/{id}', 'AdminController@updateBlog');

  $router->get('/admin/users', 'AdminController@getAllUsers');
  $router->get('/admin/get_block_users', 'AdminController@getBlockUsers');
  $router->post('/admin/block_user', 'AdminController@blockUser');
  $router->post('/admin/unblock_user', 'AdminController@unblockUser');
  $router->post('/admin/delete_user/{id}', 'AdminController@deleteUser');
  $router->post('/admin/delete_comment/{id}', 'AdminController@deleteComment');
?>